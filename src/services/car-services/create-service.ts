import Car from "@src/models/car-model";
import { carType } from "@src/routes/car-routes";

export async function createCarService(data: carType, userId: string) {
  const result = await Car.create({ ...data, advertiser: userId });

  return {
    message: `Carro da marca ${result.brand} e modelo ${result.model} anunciado com sucesso!`,
  };
}