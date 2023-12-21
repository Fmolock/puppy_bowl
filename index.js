const span = document.querySelector('span');
const ul = document.querySelector('ul');
let puppies = [];

window.addEventListener('hashchange', function(){
    render();
});


function render(){
    span.innerHTML = puppies.length + ' Puppies';
    const hash = window.location.hash;
    const id = hash.slice(1)*1;
    let filtered = puppies;
    if(id){
    filtered = filtered.filter(function(puppy){
      return puppy.id === id;
    });
  }
    const html = filtered.map(function(puppy){
    return `
    <li>
        <h4><a href='#${puppy.id}'>${ puppy.name }<a></h4>
        <img src='${puppy.imageUrl}'/>
        <p class='breed'>
        ${ puppy.breed }
        </p>
    </li>
    `;

    }).join('');
    ul.innerHTML = html;
};

render();

async function fetchPuppies(){
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2309-ftb-et-am/players')
    const json = await response.json();
    puppies = json.data.players;
    render();
    console.log(json);
};

fetchPuppies();