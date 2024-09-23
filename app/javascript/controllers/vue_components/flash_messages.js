export default {
  name: 'FlashMessages',
  props: [],
  data() {
    return {
      flash_type: '',
      message: '',
      show_message: true
    };
  },
  methods: {
    show(message, type) {
      this.flash_type = type;
      this.message = message;
      this.show_message = true;
      setTimeout(() => {
        this.flash_type = '';
        this.show_message = false;
        this.message = '';
      }, 2500);
    },
  },
  template: `
    <div>
      {{ message }}
    </div>
  `
};
