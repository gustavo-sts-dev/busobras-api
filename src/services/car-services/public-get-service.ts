import Car from "@src/models/car-model";
import User from "@src/models/user-model";

export async function publicGetCarService(data: {id: string}) {
  const { id } = data;

  const car = await Car.findById(id).lean();

  if (!car) throw new Error("Carro não encontrado");

  const advertiserData = await User.findById(car.advertiser).select("username").lean();

  if (!advertiserData) throw new Error("Anunciante não encontrado");

  const { advertiser, ...carData } = car;

  return {
    car: carData,
    advertiserName: advertiserData.username
  };
}
