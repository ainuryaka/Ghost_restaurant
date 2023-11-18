from uuid import UUID, uuid4

from sqlalchemy.dialects.postgresql import ARRAY
from sqlmodel import Column, Field, SQLModel, String


class Item(SQLModel, table=True):
    __tablename__ = "menu"

    id: UUID = Field(primary_key=True, default_factory=uuid4, index=True)

    name: str | None
    description: str | None = Field(default=None, nullable=True)
    ingredients: str | None = Field(default=None, nullable=True)
    price: float | None

    image: str | None = Field(default=None, nullable=True)
    tags: list[str] | None = Field(sa_column=Column(ARRAY(String)), default=[])

    available: bool | None = Field(default=True)
