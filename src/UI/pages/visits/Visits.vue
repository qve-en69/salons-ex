<template>
<v-app>
      <!-- <a-select style="width: 120px" @change="handleProvinceChange">
        <a-select-option v-for="province in provinceData" :key="province">
          {{ province }}
        </a-select-option>
      </a-select>
      <a-select style="width: 120px">
        <a-select-option v-for="city in cities" :key="city">
          {{ city }}
        </a-select-option>
      </a-select> -->
    <PageTitle>
      <template v-slot:default></template>
      <template v-slot:button>

        <!-- <a-select placeholder="Выберите салон" :default-value="salons.data[0].id" v-model="select_salon_id" style="width: 200px" >
            <a-select-option v-for="item in salons.data" :value="item.id" v-bind:key="item.id">
              {{item.name}}
            </a-select-option>
        </a-select>  -->

        <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ select_salon_name ? select_salon_name : "Выберите студию" }}</span>

                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>

              <v-list-item v-for="item in salons.data" :value="item.id" v-bind:key="item.id" @click="select_salon_id = item.id">
                <v-list-item-title>{{item.name}}</v-list-item-title>
              </v-list-item>

            </v-list>
          </v-menu>

      </template>
    </PageTitle>


 <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <!-- <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Сегодня
          </v-btn> -->
              <!-- <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
                <a-calendar :fullscreen="false" :header-render="headerRender" @panelChange="onPanelChange" />
              </div> -->
            <v-menu
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-model="date"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >Сегодня</v-btn>
                <!-- <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  v-model="date"
                  v-bind="attrs"
                  v-on="on
                >
                  Сегодня
                </v-btn> -->

              </template>

              <v-date-picker
                v-model="value"
                @click:date="viewDay"
                no-title
                scrollable
                locale="ru"
              >
              </v-date-picker>


            </v-menu>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'category'">
                <v-list-item-title>День</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Неделя</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>


      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="value"
          color="primary"
          category-show-all
          :type="type"
          :categories="categoriesCosmetologists"
          :interval-format="intervalFormat"
          :events="events"
          :event-color="getEventColor"
          :event-ripple="false"
          @mousedown:event="startDrag"
          @mousedown:time-category="startTime"
          @mousemove:time-category="mouseMove"
          @mouseup:time-category="endDrag"
          @mouseleave.native="cancelDrag"
          @click:event="showDetail"
          @click:more="viewDay"
          @click:date="viewDay"
    
          locale="ru"
          @change="getEvents"
        >
         <!-- @change="getEvents" -->
          <template v-slot:day-header="{ present }" v-if="type == 'category'">
            <template
              v-if="present"
            >
              <!-- <a-avatar :size="32" icon="user" />

              <a-popover v-model="visible" title="Перерыв" trigger="click">
                  <template slot="content">
                    <a-select
                        slot="content"
                        size="large"
                        placeholder=""
                    >
                          <a-select-option  :value="1">
                            1 день после визита
                          </a-select-option>
                          <a-select-option  :value="2">
                            1 неделя после визита
                          </a-select-option>
                          <a-select-option  :value="3">
                            1 месяц после визита
                          </a-select-option>
                    </a-select>

                    </a-select> -->
                    <!-- <a @click="hide">Close</a>
                  </template>
                
                <a-button  icon="plus-circle" type="link">
                </a-button>
              </a-popover> -->
           
            </template>
          </template>

          <!-- <template v-slot:day-body="{ date, week }">
            <div
              class="v-current-time"
              :class="{ first: date === week[0].date }"
              :style="{ top: nowY }"
            ></div>
          </template> -->

          <template v-slot:event="{ event, timed, eventSummary }">
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            ></div>
            <div
              v-if="timed"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>


        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>

        <a-modal v-model="create_visit_modal_visible" title="Запись клиента" @ok="hide" width="65%"> 
                <template slot="footer">

                  <a-row :gutter="[24,8]">
                    <a-col :span="6">
                     
                    </a-col>
                    <a-col :span="18">
                       <!-- <a-button key="submit" icon="delete" ghost type="danger" @click="deleteCategory(categoryId)">
                        Удалить
                      </a-button> -->
                      <a-button key="submit" type="primary" @click="saveEvent">
                        Сохранить
                      </a-button>
                    </a-col>
                  </a-row>
                </template>
          <VisitDetailFormComponent :form="visitForm" :staff="staff"/>

        </a-modal>

</v-app> 
</template>

<script lang="ts">

import {Component, Vue, Watch} from 'vue-property-decorator';
import PageTitle from "@/UI/components/common/PageTitle.vue";
import VisitDetailFormComponent from "@/UI/components/forms/visits/VisitDetailFormComponent.vue"
import {RouterNameEnum} from "@/router/router.types";
import {SalaryStore} from "@/store/modules/Salary";
import {StatusesStore} from "@/store/modules/Status";
import {PositionStore} from "@/store/modules/Position";
import {CategoryStore} from "@/store/modules/Category";
import {WorkersStore} from "@/store/modules/Workers";
import {IPosition} from "@/entity/position/position.types";
import {IStatus} from "@/entity/status/status.types";
import {ICategory} from "@/entity/category/category.types";
import {ISalaryScheme} from "@/entity/salaryScheme/salaryScheme.types";
import {IWorkers, IWorkersListItem} from "@/entity/workers/workers.types";
import WorkerAddForm from "@/form/workerAdd/workerAdd";
import {SalonsStore} from "@/store/modules/Salons";
import { ISalons} from "@/entity/salons/salons.types";
import VisitCreateForm from "@/form/visits/visitCreate";
import { VisitsStore } from "@/store/modules/Visits";
import { IVisits } from "@/entity/visits/visit.types";
import moment from 'moment';

@Component({
  components: {PageTitle, VisitDetailFormComponent},
  methods: {moment}
})

export default class Visits extends Vue {

  value: '';
  type: string;
  picker: any;
 // types: string[];
  focus!: string;
  events: any[];
  colors: string[];
  names: string[];
 // categories: string[];
  categoriesCosmetologists: any[];
  categoriesCosmetologists_id: any[];
  dragTime: any | null;
  dragEvent: any | null;
  dragStart: any | null;
  createEvent: any | null;
  createStart: any | null;
  extendOriginal: null;
  start: Start | null = null
  end: End | null = null
  ready : boolean;
  typeToLabel: {};
  visible: boolean;
  select_salon_id: number;
  select_salon_name: string | undefined;

  create_visit_modal_visible: boolean;


  workerForm = new WorkerAddForm();
  visitForm  = new VisitCreateForm();

    constructor() {
          super();

          this.picker = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
          
          this.create_visit_modal_visible = false;

          this.value        = '';
          this.ready        = false;
          this.typeToLabel  = {
            month: 'Month',
            week: 'Неделя',
            day: 'Day',
            '4day': '4 Days',
            'category': 'День'
          
          };

          this.focus                        = '';
          this.categoriesCosmetologists     = [];
          this.categoriesCosmetologists_id  = [];
          this.events                       = [];
          this.type                         = 'week';
          this.colors                       = ['#FFE46E', '#FFD5FF', '#5FFFF2', '#A9F7FF', '#69C0FF'];
          this.names                        = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'];
          this.visible                      = false;
          this.select_salon_id              = 0;
          this.select_salon_name            = '';
          
          //this.categories = ['Косметолог 1', 'Косметолог 2', 'Косметолог 3', 'Косметолог 4'];
    }

    @Watch('select_salon_id')
    nameChanged(newVal: number) {
      this.select_salon_id = newVal;
      console.log('TEST');
      console.log(this.select_salon_id);
      this.staff;
      this.getEvents();

      this.select_salon_name = SalonsStore.salons?.data.find(el => el.id == newVal)!.name;
    }

    // @Watch('select_salon_id', {immediate: true}) onSalonIdChanged() {
    //   console.log('TEST');
    // }

    mounted () {
    this.calendarInstance.checkChange()
    }

    showDetail(nativeEvent:any, event:any){
      console.log('thisss ');
      console.log(nativeEvent.event.category);
 
      if(WorkersStore.workers !== null)
      {
        let data = WorkersStore.workers.data;
        for(let i = 0; i < data.length; i++)
        {
            if(data[i].fio == nativeEvent.event.category)
            {
              console.log(data[i].id);
              let id = data[i].id;
              this.$router.push({name: RouterNameEnum.VisitsDetail, params: {id: `${id}`}})
              break;
            }
        }
      }
    }
    

    hide(id:any) {
      this.visible = false;
    }

    viewDay (date:any) {
        this.focus = date;
        this.type = 'category';
    }

    setToday () {
        this.focus = '';
    }

    prev () {
      this.calendarInstance.prev()
    }
    next () {
      this.calendarInstance.next()
    }

    startDrag (event:any, timed:any) {
       
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
       
    }

      startTime (tms:any) {

        const mouse = this.toTime(tms)
        if(this.dragEvent && this.dragTime === null) 
        {
          const start = this.dragEvent.start

          this.dragTime = mouse - start
        } 
        else 
        {
          this.createStart = this.roundTime(mouse)
          this.createEvent = {
            start: this.createStart,
            end: this.createStart,
            name: `${this.events.length} Новый сеанс `,
            color: this.rndElement(this.colors),
            timed: true,
            category: tms.category, 
          }

          console.log('time');
          console.log(this.createEvent.start);
          console.log(this.createEvent.end);
          let time = new Date(this.createEvent.start).toString();
          let timeDur = new Date(this.createEvent.end).toString();
          let start_date =  moment(time).format('YYYY-MM-DD hh:mm');
          let duration_date = moment(timeDur).format('YYYY-MM-DD hh:mm');
   
          this.visitForm.visit_dt = start_date;
          this.visitForm.visit_duration = duration_date;
          this.visitForm.color = this.createEvent.color;
          this.visitForm.salon_id = this.select_salon_id;


            if(WorkersStore.workers !== null)
            {
              let data = WorkersStore.workers.data;
              for(let i = 0; i < data.length; i++)
              {
                  if(data[i].fio == tms.category)
                  {
                    console.log(data[i].id);
                    let id = data[i].id;
                    this.visitForm.cosmetologists_id = id;
                    break;
                  }
              }
            }

        //   console.log('VISIT FORM');
        //   console.log(this.visitForm);
        //   this.create();
           this.events.push(this.createEvent)
        }
    
        this.create_visit_modal_visible = true;

      }

      create(){
            console.log('create event');
        console.log(this.createEvent);
        console.log();
      }

     async saveEvent(){
       
          if(await this.visitForm.submit(VisitsStore.create))
          {
            console.log('create event');
            console.log(this.createEvent);
           // this.events.push(this.createEvent);
           await VisitsStore.fetchAll({limit: 100});
           this.getEvents();
            this.create_visit_modal_visible = false;
          }
      }

      extendBottom (event:any) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      }

      mouseMove (tms:any) {

        const mouse = this.toTime(tms)

        if(this.dragEvent && this.dragTime !== null) 
        {
          const start = this.dragEvent.start;
          const end = this.dragEvent.end;
          const duration = end - start;
          const newStartTime = mouse - this.dragTime;
          const newStart = this.roundTime(newStartTime);
          const newEnd = newStart + duration;

          this.dragEvent.start = newStart;
          this.dragEvent.end = newEnd;
        } 
        else if(this.createEvent && this.createStart !== null) 
        {
          const mouseRounded = this.roundTime(mouse, false);
          const min = Math.min(mouseRounded, this.createStart);
          const max = Math.max(mouseRounded, this.createStart);

          this.createEvent.start = min;
          this.createEvent.end = max;
        }
      }

      endDrag () {
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      }

      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }

        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      }

      roundTime (time:any, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000

        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      }

      toTime (tms:any) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      }

      getEventColor (event:any) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF

        return event === this.dragEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event === this.createEvent
          ? `rgba(${r}, ${g}, ${b}, 0.7)`
          : event.color
      }

      
      rnd (a:any, b:any) {
        return Math.floor((b - a + 1) * Math.random()) + a;
      }
      rndElement (arr:any) {
        return arr[this.rnd(0, arr.length - 1)];
      }

      intervalFormat(interval:any) {
          return interval.time;
      }

      
      get staffLoaded(): boolean {
        return WorkersStore.workersLoaded;
      }

      get staff(): IWorkers | null {
          console.log("staf");
          this.categoriesCosmetologists     = [];
          this.categoriesCosmetologists_id  = [];

          if(WorkersStore.workers !== null)
          {
            let data = WorkersStore.workers.data;
            for(let i = 0; i < data.length; i++)
            {
                console.log(data[i]);
                console.log(this.select_salon_id);
                if(data[i].salon_id == this.select_salon_id)
                  this.categoriesCosmetologists.push(data[i].fio);
                  this.categoriesCosmetologists_id.push(data[i].id);
            }
          }
          return WorkersStore.workers;
      }


      get positions(): IPosition[] {
          return PositionStore.position;
      }
      get statuses(): IStatus[] {
          return StatusesStore.status;
      }
      get categories(): ICategory[] {
          return CategoryStore.category;
      }
      get salary(): ISalaryScheme[] {
          return SalaryStore.salary;
      }

      get salons(): ISalons | null {
          return SalonsStore.salons;
      }

      get visits(): IVisits | null {
        console.log('fetcher');
        console.log(VisitsStore.visits);
          return VisitsStore.visits;  
      }


      async getEvents(){
                              
          this.visits;
          this.events     = [];
          const eventList = [];

          if(VisitsStore.visits !== null)
          {
         
              const visit_data = VisitsStore.visits.data;

              for(let j = 0; j < visit_data.length; j++)
              {
                  if(WorkersStore.workers !== null)
                  {
                    let data = WorkersStore.workers.data;

                    for(let i = 0; i < data.length; i++)
                    {
                        if(data[i].id == visit_data[j].cosmetologists_id && visit_data[j].salon_id == this.select_salon_id)
                        {
                          console.log('hhh event');
                            eventList.push({
                              start: visit_data[j].visit_dt,
                              end:  visit_data[j].visit_duration,
                              name: `${this.events.length} Новый сеанс `,
                              color: visit_data[j].color,
                              
                              timed: true,
                              category: data[i].fio, 
                            })                     
                        }   
                    }
                     
                  } 
              }
              this.events = eventList;

          }
          console.log('events_list');
          console.log(this.events);
      }
      
      get title () {
        const { start, end } = this
        if (!start || !end) {
          return '';
        }
      }

      get calendarInstance (): Vue & { prev: () => void; next: () => void; checkChange: () => void; getFormatter: (format: any) => any } {
        return this.$refs.calendar as Vue & { prev: () => void; next: () => void; checkChange: () => void; getFormatter: (format: any) => any }
      }

      // cal () {
      //   return this.ready ? this.$refs.calendar : null
      // }
      // nowY () {
      //   return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
      // }

      async created(): Promise<void>{
        await SalonsStore.fetchAll({limit: 1000});
        await WorkersStore.fetchAll({limit: 10});
      //  let res = WorkersStore.workers;
      //  console.log(res);
        await StatusesStore.fetchAll();
        await CategoryStore.fetchAll();
        await PositionStore.fetchAll();
        await SalaryStore.fetchAll();
        await VisitsStore.fetchAll({limit: 100});


      this.workerForm.setFormDataWithoutId(this.positions, this.categories, this.statuses, this.salary);
      this.staff;
      this.visits;
     // this.$refs.calendar!.scrollToTime('08:00')

      //console.log(this.workerForm);
    }
}

 export type Start = {
      date: string;
      time: string;
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      weekday: number;
      hasDay: boolean;
      hasTime: boolean;
      past: boolean;
      present: boolean;
      future: boolean;
    }

    export type End = {
      date: string;
      time: string;
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
      weekday: number;
      hasDay: boolean;
      hasTime: boolean;
      past: boolean;
      present: boolean;
      future: boolean;
    }
    export type Event = {
      name: string;
      start: string;
      end: string;
      color: string;
    }

</script>
<style scoped lang="scss">
.v-event-draggable {
padding-left: 6px;
}

.v-event-timed {
user-select: none;
-webkit-user-select: none;
}

.v-event-drag-bottom {
position: absolute;
left: 0;
right: 0;
bottom: 4px;
height: 4px;
cursor: ns-resize;

&::after {
  display: none;
  position: absolute;
  left: 50%;
  height: 4px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  width: 16px;
  margin-left: -8px;
  opacity: 0.8;
  content: '';
}

&:hover::after {
  display: block;
}
}
</style>