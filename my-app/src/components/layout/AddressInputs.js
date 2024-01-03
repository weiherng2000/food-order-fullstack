export default function AddressInputs({addressProps,setAddressProp}){

    const {phone, streetAddress, postalCode, city, country} = addressProps;

    return(
        <>
            <label>Phone</label>
            <input  type = "tel" placeholder="Phone number" value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)}/>
            <label>Street Address</label>
            <input  type = "text" placeholder="Street Address"  value ={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}/>
            <div className="flex gap-2">
                <div>
                    <label>City</label>
                    <input   type = "text" placeholder="City Address"  value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}/>
                </div>
                <div>
                    <label>Postal Code</label>
                    <input   type = "text" placeholder="Postal code"  value={postalCode || ''}  onChange={ev => setAddressProp('postalCode', ev.target.value)}/>
                </div>
                
            </div>
            <label>Country</label>
            <input  type = "text" placeholder="Country"  value={country || ''}  onChange={ev => setAddressProp('country', ev.target.value)}/>
        </>

    );
}