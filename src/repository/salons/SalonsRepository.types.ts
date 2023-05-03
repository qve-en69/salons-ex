import {ISalons, ISalonsListItem} from "@/entity/salons/salons.types";
import {SalonGeneralRequestType} from "@/form/salonGeneral/salonGeneral.types";
import {PaginationRequestType} from "@/entity/common/pagination.types";
import {ResponseDataType} from "@/form/form.types";

export interface ISalonsRepository {
    fetchAll(data?: FormData): Promise<ISalons>;
    fetchData(data: PaginationRequestType): Promise<ISalonsListItem>;
    create(data: SalonGeneralRequestType): Promise<ResponseDataType>;
    update(data: SalonGeneralRequestType): Promise<ResponseDataType>;
    delete(data: {id: number}): Promise<ResponseDataType>;
}
