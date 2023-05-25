import React, { useState } from 'react';

const Accordion = ({ accordionData }) => {
  const [openKey, setOpenKey] = useState('')

  return (
    <div>
      <div className="accordion">
        {accordionData.map(function (object, i) {
          return
          <AccordionItem
            key={object.id}
            id={object.id}
            title={object.fields.Namn}
            content={object.fields}
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
      </div>
      {open && <div className="accordion-content">
        <p>{content.Ingredienser}</p>
        <p>{content.Tillredning}</p>
        <p style={{fontStyle: 'italic'}} >{content.Kommentar}</p>
        <div className='tag-container'>
        {content?.Taggar.map(function (tag, i) {
          return <div className='tag'>{tag}</div>
        })}
        </div>
      </div>}
    </div>
  );
};

export default Accordion;

