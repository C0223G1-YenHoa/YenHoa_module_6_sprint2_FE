import "../recharge/recharge.css"
import { recharge } from "../services/recharge"


export default function Recharge() {

    const wallet=async()=>{
        const money=document.getElementById("money").value
      const data=  await recharge(money)
      window.location.href=data
    }

    return (
        <>
            <div id="recharge" style={{ marginTop: '7%' }}>
                <div style={{ paddingTop: '30px' }} >
                    <div class="credit-card credit-card--with-stripe credit-card--visa l-centered">
                        <div class="credit-card__title">
                            Nạp tiền vào ví &nbsp; <span style={{ fontSize: '30px',color:'#ffc451' }}><i class="fa-solid fa-wallet"></i></span>
                        </div>
                        <div class="credit-card__form">
                            <input id="money" class="credit-card__number" placeholder="Nhập số tiền" type="number" />
                            <div style={{paddingLeft:'35%',paddingTop:'7%'}} class="buttons-container">
                                <button onClick={()=>{wallet()}} class="button-arounder">Nạp tiền</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}