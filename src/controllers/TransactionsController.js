import * as Yup from 'yup';
import parsePhoneNumber from 'libphonenumber-js'
import {cpf, cnpj} from 'cpf-cnpj-validator'
import Transaction from "../models/Transaction";

class TransactionsController{
  async create(req, res){
    try{

      const{
        cartCode,
        paymentType,
        installments,
        customerName,
        customerEmail,
        customerMobile,
        customerDocument,
        billingAddress,
        billingNumber,
        billingNeighborhood,
        billingCity,
        billingState,
        billingZipCode,
        creditCardNumber,
        creditCardExpiration,
        creditCardHolderName,
        creditCardCvv
      } = req.body;

      const schema = Yup.object({
        cartCode: Yup.string().required(),
        paymentType: Yup.mixed().oneOf(["credit_card", "billet"]).required(),
        installments: Yup.number().min(1).when("paymentType", 
        (paymentType, schema) => paymentType === "credit_card" ? schema.max(12) : schema.max(1)),
        customerName: Yup.string().required().min(3),
        customerEmail: Yup.string().required().email(),
        customerMobile: Yup.string()
          .required()
          .test("is-valid-mobile", "${path} is not a mobile number", (value) => 
            parsePhoneNumber(value, "BR").isValid()
          ),

        customerDocument: Yup.string().required().test('is-valid-document', '${path} is not a valid CPF / CNPJ',
        (value) => cpf.isValid(value) || cnpj.isValid(value) ),

      })

      if(!(await schema.isValid(req.body))){
        return res.status(400).json({
          error: 'Error on validate schema.'
        })
      }

      return res.status(200).json()
    }catch(err){
      console.error(err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
}

export default new TransactionsController();