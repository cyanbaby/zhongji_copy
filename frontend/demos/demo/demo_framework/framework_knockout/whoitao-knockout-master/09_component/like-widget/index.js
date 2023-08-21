export default function(params) {
  // 数据：null, 'like', 'dislike'
  this.chosenValue = params.value;
  
  // 行为
  this.like = function() { this.chosenValue('like'); }.bind(this);
  this.dislike = function() { this.chosenValue('dislike'); }.bind(this);
}