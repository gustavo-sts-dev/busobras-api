import { describe, it, expect, vi, beforeEach } from "vitest";
import Car from "@src/models/car-model";
import User from "@src/models/user-model";
import { publicGetCarService } from "./public-get-service";
import { createCarService } from "./create-service";

vi.mock("@src/models/car-model", () => ({
  default: {
    findById: vi.fn(),
    create: vi.fn()
   }
}));
vi.mock("@src/models/user-model");

describe("Suite de testes para o serviço de obtenção de carros.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Deve permitir a obtenção de um carro.", async () => {
    const mockCarId = "car-id-123";
    const mockUserId = "user-id-123";

    const mockCarData = {
      _id: mockCarId,
      advertiser: mockUserId,
      brand: "Volvo",
      model: "FH 540",
    };

    const mockUserData = {
      _id: mockUserId,
      username: "gustavo3", 
    };

    (Car.findById as any).mockReturnValue({
      lean: vi.fn().mockResolvedValue(mockCarData),
    });

    (User.findById as any).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(mockUserData),
    });

    const result = await publicGetCarService({ id: mockCarId });

    expect(Car.findById).toHaveBeenCalledWith(mockCarId);

    expect(result).toEqual({
      car: {
        _id: mockCarId,
        brand: "Volvo",
        model: "FH 540",
      },
      advertiserName: "gustavo3",
    });
  });

  it("Deve lançar um erro ao tentar criar carro sem enviar dados obrigatórios.", async () => {
    const mockUserId = "user-id-123";
    const mockCarId = "car-id-123";

    const mockIncompleteData = {
      _id: mockCarId,
      brand: "Volvo",
      advertiser: mockUserId
    };

    (Car.create as any).mockRejectedValue(new Error("Erro de validação."));

    await expect(
      createCarService(mockIncompleteData as any, mockUserId)
    ).rejects.toThrowError("Erro de validação.");

    expect(Car.create).toHaveBeenCalledWith(mockIncompleteData);
  })
});
