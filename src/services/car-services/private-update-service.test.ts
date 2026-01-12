import { describe, vi, it, expect, beforeEach } from "vitest";
import Car from "@src/models/car-model";
import { privateUpdateCarService } from "./private-update-service";

vi.mock("@src/models/car-model", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
  },
}));

describe("PrivateUpdateService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve atualizar o carro e retornar os novos dados", async () => {
    const mockUpdateData = { brand: "Volkswagen", year: 2025 };

    const mockReturnedFromDb = {
      _id: "123",
      advertiser: "1234",
      ...mockUpdateData,
    };

    (Car.findOneAndUpdate as any).mockResolvedValue(mockReturnedFromDb);

    const result = await privateUpdateCarService("123", mockUpdateData, "1234");

    expect(result).toEqual({
      message: "Dados atualizados com sucesso!",
      dataUpdated: mockReturnedFromDb
    });

    expect(Car.findOneAndUpdate).toHaveBeenCalledWith(
      {
        _id: "123",
        advertiser: "1234",
      },
      mockUpdateData,
      { new: true, runValidators: true }
    );
  });
});
