//import { warehouse } from '@/warehouse';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
import {IRecoverRepository} from "@/repository/recover/RecoverRepository.types";
import {ISalonsRepository} from "@/repository/salons/SalonsRepository.types";
import {ITerritoryRepository} from "@/repository/territory/TerritoryRepository.types";
import {IWorkersRepository} from "@/repository/workers/WorkersRepository.types";
import {IRolesRepository} from "@/repository/roles/RolesRepository.types";
import {ICategoryRepository} from "@/repository/category/CategoryRepository.types";
import { ILoyaltyBonusRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonus/LoyaltyBonusRepository.types';
import { ILoyaltyBonusTypeRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonusType/LoyaltyBonusTypeRepository.types';
import { ILoyaltyCertRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCert/LoyaltyCertRepository.types';
import { ILoyaltyCertTypeRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCertType/LoyaltyCertTypeRepository.types';
import { ILoyaltyStockRepository } from '@/repository/loyalty/LoyaltyStock/LoyaltyStockRepository.types';
import { ILoyaltySubscriptionRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscription/LoyaltySubscriptionRepository.types';
import { ILoyaltySubscriptionTypeRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscriptionType/LoyaltySubscriptionTypeRepository.types';
import {ICategoryClientRepository} from "@/repository/categoryClient/CategoryClientRepository.types";
import {IStatusRepository} from "@/repository/status/StatusRepository.types";
import {IPositionRepository} from "@/repository/position/PositionRepository.types";
import {ISalarySchemeRepository} from "@/repository/salaryScheme/SalarySchemeRepository.types";
import {ICurrencyRepository} from "@/repository/currency/СurrencyRepository.types";
import {IManagerRepository} from "@/repository/manager/ManagerRepository.types";
import {IGroupsRepository} from "@/repository/groups/GroupsRepository.types";
import { IClientsRepository } from './clients/ClientsRepository.types';
import { IServicesRepository } from "./services/ServicesRepository.types";
import { IServicesCategoryRepository } from "./servicesCategory/ServicesCategoryRepository.types";
import { IServiceCosmetologistsRepository } from "./serviceCosmetologists/ServiceCosmetologistsRepository.types";
import { IPartnerRepository } from "@/repository/partner/PartnerRepository.types";
import { IUserRepository } from "@/repository/user/UserRepository.types";
import { ISourcesRepository } from './sources/SourcesRepository.types';
//Финансы
import {ICashboxRepository} from "@/repository/finance/cashbox/CashboxRepository.types";
import {ICashboxTypeRepository} from "@/repository/finance/cashbox/CashboxTypeRepository.types";
import {ICounterpartiesRepository} from "@/repository/finance/counterparties/CounterpartiesRepository.types";
import {ICounterpartiesTypeRepository} from "@/repository/finance/counterparties/CounterpartiesTypeRepository.types";
import {IPaymentArticlesTypeRepository} from "@/repository/finance/payment_articles/PaymentArticlesTypeRepository.types";
import {IPaymentArticlesRepository} from "@/repository/finance/payment_articles/PaymentArticlesRepository.types";
import {IFinanceOperationsRepository} from "@/repository/finance/finance_operations/FinanceOperationsRepository.types";
//Финансы END
//Склады
import { IWarehouseRepository } from '@/repository/warehouse/WarehouseRepository.types'
import { IWarehouseTypesRepository } from '@/repository/warehouse/Types/WarehouseTypesRepository.types'
//Склады END

//Товары
import { IProductsRepository } from "@/repository/warehouse/Products/ProductsRepository.types";
import { IProductsCategoryTypesRepository } from '@/repository/warehouse/Category/CategoryRepository.types'
import { IProductsUnitRepository } from '@/repository/warehouse/Unit/UnitRepository.types'
import { IProductsTaxRepository } from "@/repository/warehouse/Tax/TaxRepository.types";
import { IProductsTaxSystemRepository } from "@/repository/warehouse/TaxSystem/TaxSystemRepository.types"
//Товары END

// Visits
import { IVisitsRepository } from './visits/VisitsRepository.types';
// Visits END
export interface IProvider {
    user: IUserRepository;
    clients: IClientsRepository;
    recover: IRecoverRepository;
    salons: ISalonsRepository;
    territory: ITerritoryRepository;
    workers: IWorkersRepository;
    roles: IRolesRepository;
    category: ICategoryRepository;
    categoryClient: ICategoryClientRepository;
    status: IStatusRepository;
    position: IPositionRepository;
    salaryScheme: ISalarySchemeRepository;
    currency: ICurrencyRepository;
    manager: IManagerRepository;
    groups: IGroupsRepository;
    services: IServicesRepository;
    servicesCategory: IServicesCategoryRepository;
    serviceCosmetologists: IServiceCosmetologistsRepository;
    partner: IPartnerRepository;
    sources: ISourcesRepository;

    // Склады
    warehouse: IWarehouseRepository;
    warehouseTypes: IWarehouseTypesRepository;
    // Товары
    products: IProductsRepository;
    products_categories: IProductsCategoryTypesRepository;
    products_unit: IProductsUnitRepository;
    products_tax:IProductsTaxRepository,
    products_taxsystem:IProductsTaxSystemRepository,

    // Финансы
    cashbox: ICashboxRepository;
    cashboxTypes: ICashboxTypeRepository;
    counterparties: ICounterpartiesRepository;
    counterpartiesType: ICounterpartiesTypeRepository;
    paymentArticles: IPaymentArticlesRepository;
    paymentArticlesType: IPaymentArticlesTypeRepository;
    financeOperations: IFinanceOperationsRepository;
    // Финансы END

    // Visits
    visits: IVisitsRepository ;
    // Visits END
    loyaltyBonus: ILoyaltyBonusRepository;
    loyaltyBonusType: ILoyaltyBonusTypeRepository;
    loyaltySubscription: ILoyaltySubscriptionRepository;
    loyaltySubscriptionType: ILoyaltySubscriptionTypeRepository;
    loyaltyStock: ILoyaltyStockRepository;
    loyaltyCert: ILoyaltyCertRepository;
    loyaltyCertType: ILoyaltyCertTypeRepository;
}
