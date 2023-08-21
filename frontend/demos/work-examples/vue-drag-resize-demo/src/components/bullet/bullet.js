export default {
  computed: {
    rects() {
      return this.$store.state.rect.rects;
    },
    activeRect() {
      return this.$store.getters["rect/getActive"];
    },
  },
  methods: {
    handleClickRemoveBtn() {
        alert(this.activeRect)
        if(this.activeRect != null) {
        this.$store.dispatch('rect/removeElement', { id: this.activeRect });
      }
    },
    handleClickAddBtn() {
      const tempElement = {   
        // id: nanoid(),
        isShow: true,
        'width': 200,
        'height': 150,
        'top': 350,
        'left': 10,
        'draggable': true,
        'resizable': true,
        'minw': 10,
        'minh': 10,
        'axis': 'both',
        'parentLim': true,
        'snapToGrid': false,
        'aspectRatio': false,
        'zIndex': 1,
        'color': '#EF9A9A',
        'active': false,
        'text': '我是标题 1'
      }

      
      this.$store.dispatch('rect/addElement', { elem: tempElement });
    }
  },
};
