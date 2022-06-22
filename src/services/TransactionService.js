import {v4 as uuidv4} from 'uuid';
import Cart from "../models/Cart";
import Transaction from "../models/Transaction";

class TransactionService{
  async process({
    cartCode,
    paymentType,
    installments,
    customer,
    billing,
    creditCard
  }){
    const cart = await Cart.findOne({ code: cartCode });

    if(!cart){
      throw `Cart ${cartCode} was not found.`
    }

    const transaction = await Transaction.create({
      cartCode: cart.code,
      code: await uuidv4(),
      total: cart.price,
      paymentType,
      installments,
      status: "started",
      customerName: customer.name,
      customerEmail: customer.email,
      customerMobile: customer.mobile,
      customerDocument: customer.document,
      billingAddress: billing.address,
      billingNumber: billing.number,
      billingNeighborhood: billing.neighborhood,
      billingCity: billing.city,
      billingState: billing.state,
      billingZipCode: billing.zipecode,
    })

    return transaction;
  }
}

export default TransactionService;