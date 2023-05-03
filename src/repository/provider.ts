import { IProvider } from './provider.types';
import { RecoverRepository } from '@/repository/recover/RecoverRepository';
import { SalonsRepository } from '@/repository/salons/SalonsRepository';
import { ClientsRepository } from '@/repository/clients/ClientsRepository';
import { TerritoryRepository } from '@/repository/territory/TerritoryRepository';
import WorkersRepository from '@/repository/workers/WorkersRepository';
import RolesRepository from '@/repository/roles/RolesRepository';
import CategoryRepository from '@/repository/category/CategoryRepository';
import { StatusRepository } from '@/repository/status/StatusRepository';
import { PositionRepository } from '@/repository/position/PositionRepository';
import { SalarySchemeRepository } from '@/repository/salaryScheme/SalarySchemeRepository';
import { CurrencyRepository } from '@/repository/currency/СurrencyRepository';
import { ManagerRepository } from '@/repository/manager/ManagerRepository';
import { GroupsRepository } from '@/repository/groups/GroupsRepository';
// Услуги
import { ServicesRepository } from '@/repository/services/ServicesRepository';
import { ServiceCategoryRepository } from './servicesCategory/ServicesCategoryRepository';
import { ServiceCosmetologistsRepository } from '@/repository/serviceCosmetologists/ServiceCosmetologistsRepository';
// Услуги END
import { UserRepository } from '@/repository/user/UserRepository';
import { PartnerRepository } from '@/repository/partner/PartnerRepository';
import SourcesRepository from '@/repository/sources/SourcesRepository';
import CategoryClientRepository from '@/repository/categoryClient/CategoryClientRepository';
// лояльность
import { LoyaltyCertRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCert/LoyaltyCertRepository';
import { LoyaltyCertTypeRepository } from '@/repository/loyalty/LoyaltyCert/LoyaltyCertType/LoyaltyCertTypeRepository';
import { LoyaltyBonusRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonus/LoyaltyBonusRepository';
import { LoyaltyBonusTypeRepository } from '@/repository/loyalty/LoyaltyBonus/LoyaltyBonusType/LoyaltyBonusTypeRepository';
import { LoyaltySubscriptionRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscription/LoyaltySubscriptionRepository';
import { LoyaltySubscriptionTypeRepository } from '@/repository/loyalty/LoyaltySubscription/LoyaltySubscriptionType/LoyaltySubscriptionTypeRepository';
import { LoyaltyStockRepository } from '@/repository/loyalty/LoyaltyStock/LoyaltyStockRepository';
// Финансы
import { CashboxRepository } from '@/repository/finance/cashbox/CashboxRepository';
import { CashboxTypeRepository } from '@/repository/finance/cashbox/CashboxTypeRepository';
import { CounterpartiesRepository } from '@/repository/finance/counterparties/CounterpartiesRepository';
import { CounterpartiesTypeRepository } from '@/repository/finance/counterparties/CounterpartiesTypeRepository';
import { PaymentArticlesRepository } from '@/repository/finance/payment_articles/PaymentArticlesRepository';
import { PaymentArticlesTypeRepository } from '@/repository/finance/payment_articles/PaymentArticlesTypeRepository';
import { FinanceOperationsRepository } from '@/repository/finance/finance_operations/FinanceOperationsRepository';
// Финансы END

// Товары
import { ProductsRepository } from "@/repository/warehouse/Products/ProducsRepository"
import { ProductsCategoryRepository } from "@/repository/warehouse/Category/CategoryRepository"
import { ProductsUnitRepository } from "@/repository/warehouse/Unit/UnitRepository"
import { ProductsTaxRepository } from  "@/repository/warehouse/Tax/TaxRepository"
import { ProductsTaxSystemRepository } from "@/repository/warehouse/TaxSystem/TaxSystemRepository";
// Склады
import { WarehouseRepository } from "@/repository/warehouse/WarehouseRepository"
import { WarehouseTypesRepository } from "@/repository/warehouse/Types/WarehouseTypesRepository"
// Склады END

// Visits
import { VisitsRepository } from './visits/VisitsRepository';

// Visits END

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const provider = (): IProvider => ({
    user: new UserRepository(),
    recover: new RecoverRepository(),
    salons: new SalonsRepository(),
    clients: new ClientsRepository(),
    territory: new TerritoryRepository(),
    workers: new WorkersRepository(),
    roles: new RolesRepository(),
    category: new CategoryRepository(),
    sources: new SourcesRepository(),
    categoryClient: new CategoryClientRepository(),
    status: new StatusRepository(),
    position: new PositionRepository(),
    salaryScheme: new SalarySchemeRepository(),
    currency: new CurrencyRepository(),
    manager: new ManagerRepository(),
    groups: new GroupsRepository(),

    //Услуги
    services: new ServicesRepository(),
    servicesCategory: new ServiceCategoryRepository(),
    serviceCosmetologists: new ServiceCosmetologistsRepository(),

    //Услуги
    partner: new PartnerRepository(),

    // Лояльность
    loyaltyCertType: new LoyaltyCertTypeRepository(),
    loyaltyCert: new LoyaltyCertRepository(),
    loyaltyBonusType: new LoyaltyBonusTypeRepository(),
    loyaltyBonus: new LoyaltyBonusRepository(),
    loyaltySubscriptionType: new LoyaltySubscriptionTypeRepository(),
    loyaltySubscription: new LoyaltySubscriptionRepository(),
    loyaltyStock: new LoyaltyStockRepository(),

    //Финансы
    cashbox: new CashboxRepository(),
    cashboxTypes: new CashboxTypeRepository(),
    counterparties: new CounterpartiesRepository(),
    counterpartiesType: new CounterpartiesTypeRepository(),
    paymentArticles: new PaymentArticlesRepository(),
    paymentArticlesType: new PaymentArticlesTypeRepository(),
    financeOperations: new FinanceOperationsRepository(),
    //Финансы

    //Визиты
    visits: new VisitsRepository(),
    //Визиты

    //Товары
    products: new ProductsRepository(),
    products_categories: new ProductsCategoryRepository(),
    products_unit: new ProductsUnitRepository(),
    products_tax: new ProductsTaxRepository(),
    products_taxsystem: new ProductsTaxSystemRepository(),

    //Склады
    warehouse: new WarehouseRepository(),
    warehouseTypes: new WarehouseTypesRepository(),



});
