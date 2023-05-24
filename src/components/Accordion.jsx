import React, { useState } from 'react';

const Accordion = ({accordionData}) => {
  const [openKey, setOpenKey] = useState('rec5Uh56048pvXZV5')

  return (
        <div>
            <div className="accordion">
            {accordionData.map(function(object, i){
              return <AccordionItem 
                key={object.id}
                id={object.id}
                title={object.fields.Namn} 
                content={object.fields.Ingredienser}
                setOpenKey={setOpenKey} 
                open={openKey === object.id} />;
            })}     
            </div>
        </div>
  );
};

const AccordionItem = ({ id, title, content, setOpenKey, open }) => {
    
  console.log("is open: " + open);
    return (
      <div key={id} className="accordion-item">
        <div className="accordion-title" onClick={() => setOpenKey(id)}>
          <div>{title}</div>
          <div>{open ? '' : '+'}</div>
        </div>
        {open && <div className="accordion-content">{content}</div>}
      </div>
    );
  };
  
  export default Accordion;

