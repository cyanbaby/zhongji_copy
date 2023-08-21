export default {
    functional: true,
    props: {
      condition: {
        type: Boolean,
        default: false,
      },
    },
    render(h, { props, children }) {
      return props.condition ? children[0] : children[1];
    },
  };