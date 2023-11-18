export default interface MenuItem {
    id: string;
    name: string;
    description?: string;
    ingredients?: string;
    price: number;
    image?: string;
    tags: string[];
    available: boolean;
}
