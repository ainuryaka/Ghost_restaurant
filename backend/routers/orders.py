import json
from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.exc import StatementError
from sqlmodel import select

from database import session
from database.models import Item, Order, OrderedItem

router = APIRouter(prefix="/orders", tags=["orders"])


class OrderResponse(BaseModel):
    id: UUID

    name: str
    phone: str
    city: str
    address: str

    timestamp: datetime

    items: list[OrderedItem]


class OrderCreate(BaseModel):
    name: str
    phone: str
    city: str
    address: str

    items: list[dict]


@router.get("/", status_code=status.HTTP_200_OK)
def get_orders():
    with session:
        stmt = select(Order)
        orders: list[Order] = session.scalars(stmt)

        return [json.loads(order.json()) for order in orders]


@router.post(
    "/", status_code=status.HTTP_201_CREATED, response_model=OrderResponse
)
def place_order(order_model: OrderCreate):
    with session:
        order_model = order_model.dict()
        order_model["id"] = None
        items = order_model.pop("items")

        order = Order(**order_model)

        for item_data in items:
            item = OrderedItem(**item_data)
            available = session.scalar(
                select(Item).where(Item.id == item.item_id and Item.available)
            )

            if not available:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Item with id {item.item_id} is not available.",
                )

            order.items.append(item)

        session.add(order)
        session.commit()
        session.refresh(order)

        return order


@router.get(
    "/{order_id}", status_code=status.HTTP_200_OK, response_model=OrderResponse
)
def get_order(order_id: str):
    with session:
        try:
            stmt = select(Order).where(Order.id == order_id)
            order: Order = session.scalar(stmt)

            if not order:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Order with id {order_id} not found.",
                )

            return order
        except StatementError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid UUID: {order_id}",
            )
