import {getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {
    FiltersSalonsClientsNameEnum,
    FiltersSalonsFinanceNameEnum,
    FiltersSalonsNameEnum,
    FiltersClientsNameEnum,
    FiltersClientsNotesNameEnum,
    ReportFilterStudioNameEnum,
    IFilters
} from "@/entity/filters/filters.types";

@Module({
    namespaced: true,
    name: 'filters',
    store,
    dynamic: true
})
class FiltersModule extends VuexModule {
    filtersSalons: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsNameEnum.Partner,
            filterType: 'number',
            filterCode: 'partner_id'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsNameEnum.City,
            filterType: 'number',
            filterCode: 'city_id'
        },
        {
            id: 2,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsNameEnum.Manager,
            filterType: 'number',
            filterCode: 'escort_manager_id'
        },
        {
            id: 3,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                },
                {
                    label: 'Активный',
                    key: '1'
                },
                {
                    label: 'Не активный',
                    key: '2'
                },
            ],
            filterName: FiltersSalonsNameEnum.Active,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 4,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsNameEnum.OpeningDateFrom,
            filterType: 'date',
            filterCode: 'opening_date_from'
        },
        {
            id: 5,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsNameEnum.OpeningDateTo,
            filterType: 'date',
            filterCode: 'opening_date_to'
        }
    ];

    filtersSalonFinances: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsFinanceNameEnum.Date,
            filterType: 'date',
            filterCode: 'active'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsFinanceNameEnum.Type,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 2,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsFinanceNameEnum.Purpose,
            filterType: 'number',
            filterCode: 'active'
        }
    ];
    filtersSalonClients: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsClientsNameEnum.DateLast,
            filterType: 'date',
            filterCode: 'active'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsClientsNameEnum.DateNext,
            filterType: 'date',
            filterCode: 'active'
        }
    ];
    filtersClients: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Все',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNameEnum.Sex,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNameEnum.Sold,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 2,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNameEnum.Visited,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 3,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNameEnum.HaveNotes,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 4,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNameEnum.NoHaveNotes,
            filterType: 'number',
            filterCode: 'active'
        }
    ];
    filtersClientsNotes: IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNotesNameEnum.Cosmetologist,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNotesNameEnum.Create,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 2,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNotesNameEnum.DateVisited,
            filterType: 'date',
            filterCode: 'active'
        },
        {
            id: 3,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNotesNameEnum.Service,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 4,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersClientsNotesNameEnum.Status,
            filterType: 'number',
            filterCode: 'active'
        }
    ];

    //TODO:: для отчета - продажи по услугам
    filtersReportSalesbyServiceColumns : IFilters[] = [
        {
            id: 0,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: ReportFilterStudioNameEnum.Studio,
            filterType: 'number',
            filterCode: 'active'
        },
        {
            id: 1,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: ReportFilterStudioNameEnum.Category,
            filterType: 'number',
            filterCode: 'active'
        },

        {
            id: 2,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: ReportFilterStudioNameEnum.Specification,
            filterType: 'number',
            filterCode: 'active'
        },

        {
            id: 3,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsClientsNameEnum.DateLast,
            filterType: 'date',
            filterCode: 'active'
        },
        {
            id: 4,
            filterValue: [
                {
                    label: 'Не указано',
                    key: '0'
                }
            ],
            filterName: FiltersSalonsClientsNameEnum.DateNext,
            filterType: 'date',
            filterCode: 'active'
        }
    ]
}

export const FiltersStore = getModule(FiltersModule);
