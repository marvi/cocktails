const Filters = (baseSpiritFilter, setBaseSpiritFilter) => {

    return(
        <div>
            <select name="Bassprit" id="Bassprit" onChange={e => setBaseSpiritFilter(e.target.value)}>
                <option value="">Alla</option>                
                <option value="Whisky">Whisky</option>
                <option value="Rom">Rom</option>
                <option value="Gin">Gin</option>
                <option value="Vodka">Vodka</option>
                <option value="Tequila">Tequila</option>
                <option value="Övrigt">Övrigt</option>
            </select>
        </div>
    );

}
export default Filters;
