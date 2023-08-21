// fetch request
console.log('run getColors')
const colors = fetch('https://mdn.github.io/js-examples/module-examples/top-level-await/data/colors.json')
	.then(response => {
    console.log('fetch then')
    return response.json()
  });

export default await colors;
