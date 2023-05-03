import { ILoyaltyCertType, ILoyaltyCertTypeListItem } from '@/entity/loyalty/loyaltyCert/loyaltyCertType/LoyaltyCertType.types';
import { LoyaltyCertTypeGeneralRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeGeneral.types';
import { LoyaltyCertTypeAddFormRequestType } from '@/form/loyalty/loyaltyCertType/LoyaltyCertTypeAddForm.types';
import { PaginationRequestType } from '@/entity/common/pagination.types';
import { ResponseDataType } from '@/form/form.types';

export interface ILoyaltyCertTypeRepository {
    fetchAll(data?: FormData): Promise<ILoyaltyCertType>;
    fetchData(data: PaginationRequestType): Promise<ILoyaltyCertTypeListItem>;
    create(data: LoyaltyCertTypeAddFormRequestType): Promise<ResponseDataType>;
    update(data: LoyaltyCertTypeGeneralRequestType): Promise<ResponseDataType>;
    delete(data: { id: number }): Promise<ResponseDataType>;
}
