Component({
  properties:{
    count: {
      type: Number,
      value: 1
    },
    double: {
      type: Boolean,
      value: false
    }
  },
  data: {
    countArray:[]
  },
  methods:{
    setCount(value){
      this.setData({
        countArray: new Array(value).fill(1)
      })
    }
  },
  observers:{
    'count'(value){
      this.setCount(value)
    }
  },
  attached(){
    this.setCount(this.data.count)
  }
})