import PropTypes from 'prop-types';

const Filters = ({tagFilter, setTagFilter, baseSpiritFilter, setBaseSpiritFilter}) => {

    return (
        <div>
            <div className={"filter-container"}>
                <select name="Bassprit" id="Bassprit"
                        onChange={(e) => setBaseSpiritFilter(e.target.value)}
                        value={baseSpiritFilter || ''}
                >
                    <option value="">Alla</option>
                    <option value="Whisky">Whisky</option>
                    <option value="Rom">Rom</option>
                    <option value="Gin">Gin</option>
                    <option value="Vodka">Vodka</option>
                    <option value="Tequila">Tequila</option>
                    <option value="Sherry">Sherry</option>
                    <option value="Brandy">Brandy</option>
                </select>
            </div>

            <div className={"filter-container"}>
                <select name="tag-filter"
                        value={tagFilter || ''}
                        id="tag-filter" onChange={(e) => setTagFilter(e.target.value)}>
                    <option value="">Alla</option>
                    <option value="Klassisk">Klassisk</option>
                    <option value="Fräsch">Fräsch</option>
                    <option value="Somrig">Somrig</option>
                    <option value="Färgglad">Färgglad</option>
                    <option value="Skummig">Skummig</option>
                    <option value="Stiff">Stiff</option>
                    <option value="Söt">Söt</option>
                    <option value="Long">Long</option>
                    <option value="Låg alkohol">Låg alkohol</option>
                </select>
            </div>
            <button onClick={() => {setTagFilter(''); setBaseSpiritFilter('') }}>Nollställ</button>
        </div>
    );
}

Filters.propTypes = {
    tagFilter: PropTypes.string,
    setTagFilter: PropTypes.func,
    baseSpiritFilter: PropTypes.string,
    setBaseSpiritFilter: PropTypes.func
}

export default Filters;
