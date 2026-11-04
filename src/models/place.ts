export class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: { lat: number; lng: number },
    id?: string,
  ) {
    this.id = id ?? new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
