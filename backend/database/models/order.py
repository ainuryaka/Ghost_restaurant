from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import Field, Relationship, SQLModel


class OrderedItem(SQLModel, table=True):
    __tablename__ = "ordered_items"

    id: UUID = Field(primary_key=True, default_factory=uuid4, index=True)

    item_id: UUID = Field(foreign_key="menu.id")
    quantity: int

    order_id: UUID = Field(foreign_key="orders.id")
    order: "Order" = Relationship(
        back_populates="items", sa_relationship_kwargs={"lazy": "joined"}
    )


class Order(SQLModel, table=True):
    __tablename__ = "orders"

    id: UUID | None = Field(
        primary_key=True, default_factory=uuid4, index=True
    )

    name: str
    phone: str
    city: str
    address: str
    timestamp: datetime | None = Field(default_factory=datetime.utcnow)

    items: list[OrderedItem] = Relationship(
        back_populates="order", sa_relationship_kwargs={"lazy": "joined"}
    )
