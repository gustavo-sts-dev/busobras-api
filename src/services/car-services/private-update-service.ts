import Car from "@src/models/car-model";
import { carType } from "@src/routes/car-routes";

export async function privateUpdateCarService(
  id: string,
  data: Partial<carType>,
  userId: string
) {
  const result = await Car.findOneAndUpdate({
    _id: id,
    advertiser: userId
  }, data, {
    new: true,
    runValidators: true
  });

  if (!result) throw new Error("Id do carro ou do usuário inválidos! Carro não atualizado.")

  return {
    message: `Dados atualizados com sucesso!`,
    dataUpdated: result
  }
}
