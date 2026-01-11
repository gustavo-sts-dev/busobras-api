import Car from "@src/models/car-model";
import User from "@src/models/user-model";

export async function publicGetCarService(data: {id: string}) {
  const { id } = data;

  const car = await Car.findById(id).lean();

  if (car) {
    const advertiserData = await User.findById(car.advertiser)
      .select("username")
      .lean();

    const { advertiser, ...carData } = car;
      
    return {
      car: carData,
      advertiserName: advertiserData?.username,
    };
  }
}
