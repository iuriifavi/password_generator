'use strict';

var generate = (function () {
  const bigL = new Array(26).fill(65).map((x,i) => String.fromCharCode(x+i)); //[A-Z]
  const lowerL = Array(26).fill(65 + 32).map((x,i) => String.fromCharCode(x+i)); //[a-z]
  const nums = [0,1 ,2, 3, 4, 5, 6, 7, 8, 9];
  const special = [...'!@#$%^&*'];

  const defaultCategories = [ bigL, lowerL, nums, special ];

  return function(length, occurance, categories) {
    categories = categories || defaultCategories;

    const maxLength = categories.reduce( (sum, cat) => sum + Math.min(cat.length,occurance), 0);

    //there is no possible passwords
    if (maxLength < length) return;

    let password = [] ;
    let lastCategory;
    let used = categories.map(_ => 0);
    let cycles = 0;

    while(password.length < length) {
      const selectedCategory = ~~(Math.random() * categories.length);
      const selectedIndex = ~~(Math.random() * categories[selectedCategory].length);
      const selectedCh = categories[selectedCategory][selectedIndex];

      if (selectedCategory === lastCategory) {
        //wheels stuck, we need to reset wheels and start over
        if (cycles++ > 10) { used.fill(0); password = []; cycles = 0; }
        continue;
      }

      //limit of occurances reached
      if (used[selectedCategory] >= occurance) continue;

      //second occurance of the same character
      if (password.indexOf(selectedCh) !== -1) continue;

      password.push(selectedCh);
      lastCategory = selectedCategory;
      used[selectedCategory] += 1;
    }
    
    return password.join('');
  }
})();
