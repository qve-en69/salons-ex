import { ILoyaltyCert, ILoyaltyCertListItem } from '@/entity/loyalty/loyaltyCert/loyaltyCert/loyaltyCert.types';
import { LoyaltyCertGeneralRequestType } from '@/form/loyalty/loyaltyCert/LoyaltyCertGeneral.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltyCertRepository {
    fetchAll(data?: FormData): Promise<ILoyaltyCert>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltyCertListItem>;
    create(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType>;
    update(data: LoyaltyCertGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
