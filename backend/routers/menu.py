import json

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import or_
from sqlalchemy.exc import StatementError
from sqlmodel import select

from database import session
from database.models import Item

router = APIRouter(prefix="/menu", tags=["menu"])


@router.get("/", status_code=status.HTTP_200_OK, response_model=list[Item])
def get_menu(search: str = None):
    with session:
        stmt = select(Item)

        if search:
            stmt = stmt.where(
                or_(
                    Item.tags.contains([search.lower()]),
                    Item.name.ilike(f"%{search.lower()}%"),
                )
            )
        menu: list[Item] = session.scalars(stmt)

        return [json.loads(item.json()) for item in menu]


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=Item)
def add_item(item: Item):
    with session:
        item.id = None
        item.tags = [tag.lower() for tag in item.tags]

        session.add(item)
        session.commit()
        session.refresh(item)

        return item


@router.get("/{item_id}", status_code=status.HTTP_200_OK, response_model=Item)
def get_item(item_id: str):
    with session:
        try:
            stmt = select(Item).where(Item.id == item_id)
            item: Item = session.scalar(stmt)

            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Item with id {item_id} not found.",
                )

            return item
        except StatementError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid UUID: {item_id}",
            )


@router.put("/{item_id}", status_code=status.HTTP_200_OK, response_model=Item)
def update_item(item_id: str, new_item: Item):
    with session:
        try:
            stmt = select(Item).where(Item.id == item_id)
            item: Item = session.scalar(stmt)

            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Item with id {item_id} not found.",
                )

            for field, value in new_item.dict().items():
                if field != "id" and value is not None:
                    setattr(item, field, value)

            session.add(item)
            session.commit()
            session.refresh(item)

            return item
        except StatementError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid UUID: {item_id}",
            )


@router.delete("/{item_id}", status_code=status.HTTP_200_OK)
def delete_item(item_id: str):
    with session:
        try:
            stmt = select(Item).where(Item.id == item_id)
            item: Item = session.scalar(stmt)

            if not item:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Item with id {item_id} not found.",
                )

            session.delete(item)
            session.commit()

            return {"message": f"Item with id {item_id} deleted."}
        except StatementError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid UUID: {item_id}",
            )
