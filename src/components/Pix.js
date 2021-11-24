export default class pix{
  constructor(pixKey, description, merchantName, merchantCity, txid, amount) {
    this.pixKey = pixKey;
    this.description = description;
    this.merchantName = merchantName;
    this.merchantCity = merchantCity;
    this.txid = txid;
    this.amount = amount.toFixed(2);

    this.ID_PAYLOAD_FORMAT_INDICATOR = "00";
    this.ID_MERCHANT_ACCOUNT_INFORMATION = "26";
    this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
    this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
    this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION = "02";
    this.ID_MERCHANT_CATEGORY_CODE = "52";
    this.ID_TRANSACTION_CURRENCY = "53";
    this.ID_TRANSACTION_AMOUNT = "54";
    this.ID_COUNTRY_CODE = "58";
    this.ID_MERCHANT_NAME = "59";
    this.ID_MERCHANT_CITY = "60";
    this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
    this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
    this.ID_CRC16 = "63";
  }

  _getValue(id, value) {
    const size = String(value.length).padStart(2, "0");
    return id + size + value;
  }

  _getMechantAccountInfo() {
    const gui = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI,
      "br.gov.bcb.pix"
    );
    const key = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY,
      this.pixKey
    );
    const description = this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
      this.description
    );

    return this._getValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION,
      gui + key + description
    );
  }

  _getAdditionalDataFieldTemplate() {
    const txid = this._getValue(
      this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,
      this.txid
    );
    return this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
  }

  getPayload() {
    const payload =
      this._getValue(this.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
      this._getMechantAccountInfo() +
      this._getValue(this.ID_MERCHANT_CATEGORY_CODE, "0000") +
      this._getValue(this.ID_TRANSACTION_CURRENCY, "986") +
      this._getValue(this.ID_TRANSACTION_AMOUNT, this.amount) +
      this._getValue(this.ID_COUNTRY_CODE, "BR") +
      this._getValue(this.ID_MERCHANT_NAME, this.merchantName) +
      this._getValue(this.ID_MERCHANT_CITY, this.merchantCity) +
      this._getAdditionalDataFieldTemplate();

    return payload + this._getCRC16(payload);
  }

  _getCRC16(payload) {
    function ord(str) {
      return str.charCodeAt(0);
    }
    function dechex(number) {
      if (number < 0) {
        number = 0xffffffff + number + 1;
      }
      return parseInt(number, 10).toString(16);
    }

    //ADICIONA DADOS GERAIS NO PAYLOAD
    payload = payload + this.ID_CRC16 + "04";

    //DADOS DEFINIDOS PELO BACEN
    let polinomio = 0x1021;
    let resultado = 0xffff;
    let length;

    //CHECKSUM
    if ((length = payload.length) > 0) {
      for (let offset = 0; offset < length; offset++) {
        resultado ^= ord(payload[offset]) << 8;
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
          resultado &= 0xffff;
        }
      }
    }

    //RETORNA CÓDIGO CRC16 DE 4 CARACTERES
    return this.ID_CRC16 + "04" + dechex(resultado).toUpperCase();
  }
};



