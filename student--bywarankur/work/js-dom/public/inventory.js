(function IIFE() {

    const addButton = document.querySelector('.add-button');
    const itemList = document.querySelector('.items-list-body');
    const newItem = document.querySelector('.to-add');
    const items = {};
  
  
    newItem.addEventListener('keyup', function (event) {
        const text = event.target.value;
        addButton.disabled = !text;
    });
  
    addButton.addEventListener('click', function (event) {
        const text = newItem.value;
        const id = getItemID();
        items[ id ] = { itemId: id, name: text, quantity: 0 };
        
        getItemsObject(items);
        newItem.value = '';
        addButton.disabled = true;
    });

    function getItemID() {
        return 'ID'+ Math.floor( Math.random() * 10000 );
    };
  
    function getItemsObject( items ) {
        itemList.innerHTML = Object.keys(items).map( (eachItem) => {
       
        return `<li>
        <button data-id=${eachItem} class="to-remove" type="button">X</button>
        <span data-id=${eachItem} class="item-name">${items[eachItem].name}</span>
        <button data-id=${eachItem} class="to-minus" type="button" ${items[eachItem].quantity===0 ? 'disabled' : 'enabled'}>-</button>
        <span data-id=${eachItem} class="quantity">${items[eachItem].quantity}</span>
        <button data-id=${eachItem} class="to-plus" type="button">+</button>
        </li>`;
        }).join('\n');
      };


      itemList.addEventListener('click', function(event) {
        const id = event.target.dataset.id;

        if(event.target.classList.contains('to-remove')) {
            delete items[id];
        }

        if(event.target.classList.contains('to-plus')) {
            items[id].quantity += 1;
        }

        if(event.target.classList.contains('to-minus')){            
            items[id].quantity -= 1;
            if(items[id].quantity <= 0) {
                items[id].quantity = 0;
            } 
        }
        getItemsObject(items);

      });

      addButton.disabled = true;
      getItemsObject(items);

  })();