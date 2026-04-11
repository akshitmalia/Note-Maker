let notes = JSON.parse(localStorage.getItem("Notes")) || [];
display();

function save(){
    const note=document.getElementById("input_notes").value.trim();
    if(!note){
        return;
    }
    document.getElementById("input_notes").value="";
    const data={
        text:note,
        id:Date.now(),
        time: new Date().toLocaleString() 
    };
    notes.push(data);
    storage();
    display();
}

function delete_notes(id){
    notes=notes.filter(x=>
        x.id!==id
    );
    storage();
    display();

}

function display(){
    const list=document.querySelector("#div_id");
    if(notes.length===0){
        list.innerHTML=
        `
        <p class="text-light text-center">No Saved Notes yet !!!</p>
        `
    }
    else{
    list.innerHTML=notes.map(x=>
        `
       <div class="d-flex justify-content-center"> 
   <div class="card mb-3 w-100">
        <div class="card-body">
          <p class="card-text">${DOMPurify.sanitize(x.text)}</p>
          <small class="text-muted">Created on: ${x.time}</small>
          <div class="mt-2">
            <button onclick="delete_notes(${x.id})" class="btn  btn-warning ">Delete</button>
   
          </div>
        </div>
      </div>
      </div>

        `
    ).join("");
    }

}

function storage(){
    localStorage.setItem("Notes",JSON.stringify(notes));
}