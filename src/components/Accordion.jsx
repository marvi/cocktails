import {useState} from 'react';
import PropTypes from 'prop-types';

const Accordion = ({accordionData}) => {

    const [openKey, setOpenKey] = useState('')

    return (
        <div className="accordion">
            {accordionData.length === 0 &&
            <h2>Ingen cocktail hittades</h2>}
            {accordionData.map((object) => {
                return <AccordionItem
                    key={object.id}
                    id={object.id}
                    title={object.fields.Namn}
                    content={object.fields}
                    setOpenKey={setOpenKey}
                    open={openKey === object.id}
                />;
            })}

        </div>
    );
};

Accordion.propTypes = {
    accordionData: PropTypes.array
}

const AccordionItem = ({id, title, content, setOpenKey, open}) => {
    return (
        <div key={id} className="accordion-item">
            <div className="accordion-title" onClick={() => setOpenKey(id)}>
                {title}
            </div>
            {open && <div className="accordion-content">
                <p>{content.Ingredienser}</p>
                <p>{content.Tillredning}</p>
                <p style={{fontStyle: 'italic'}}>{content.Kommentar}</p>
                <div className='tag-container'>
                    {content?.Taggar.map((tag, i) => <div key={i} className='tag'>{tag}</div>)}
                </div>
            </div>
            }
        </div>
    );
};

AccordionItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.object,
    setOpenKey: PropTypes.func,
    open: PropTypes.bool
}

export default Accordion;

