<template>
  <span class="timer">{{ currentTimeTemp }} сек.</span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
    @Prop() readonly currentTime!: number;
    currentTimeTemp: number;
    constructor() {
        super();
        this.currentTimeTemp = this.currentTime;
    }

  // eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line no-undef
    timer!: NodeJS.Timeout;
    isZero = false;
    @Watch('currentTimeTemp')
    onChangeTimer(time: number): void {
        if (time === 0) {
            this.stopTimer();
        }
    }
    startTimer(): void {
        this.timer = setTimeout(() => {
            --this.currentTimeTemp;
            this.startTimer();
        }, 1000);
    }
    changeTimer(): void {
        this.currentTimeTemp--;
    }
    stopTimer(): void {
        clearTimeout(this.timer);
        this.isZero = true;
        this.$emit('stop', this.isZero);
    }
    mounted(): void {
        this.startTimer();
    }
    destroyed(): void {
        this.stopTimer();
    }
}
</script>
<style lang="scss">
.timer {
  line-height: 24px;
  color: #BFBFBF;
  font-size: 14px;
}
</style>
