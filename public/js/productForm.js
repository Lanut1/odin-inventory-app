function toggleBrandInput() {
  const newBrandRadio = document.querySelector("input[value='new_brand']");
  const newBrandText = document.getElementById("newBrandText");

  if (newBrandRadio.checked) {
    newBrandText.disabled = false;
  } else {
    newBrandText.disabled = true;
    newBrandText.value = '';
  }
}

function toggleCategoryInput() {
  const newCategoryRadio = document.querySelector("input[value='new_category']");
  const newCategoryText = document.getElementById("newCategoryText");

  if (newCategoryRadio.checked) {
    newCategoryText.disabled = false;
  } else {
    newCategoryText.disabled = true;
    newCategoryText.value = '';
  }
}

function toggleSkintypeInput() {
  const newSkintypeRadio = document.querySelector("input[value='new_skintype']");
  const newSkintypeText = document.getElementById("newSkintypeText");

  if (newSkintypeRadio.checked) {
    newSkintypeText.disabled = false;
  } else {
    newSkintypeText.disabled = true;
    newSkintypeText.value = '';
  }
}