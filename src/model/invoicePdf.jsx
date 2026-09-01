import React from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { logo } from "../assets/comman";

function formatNumber(value) {
  return Math.round(Number(value || 0)).toLocaleString("en-IN");
}

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString("en-IN") : "";
}

function buildAddress(address = {}) {
  return [
    address.buildingName,
    address.buildingBlock,
    address.flatNo ? `FLAT NO. ${address.flatNo}` : "",
    address.streetName,
    address.landmark ? `NEAR ${address.landmark}` : "",
    address.city && address.pincode ? `${address.city} - ${address.pincode}` : address.city,
  ]
    .filter(Boolean)
    .join(", ");
}

function Money({ value, negative = false }) {
  return <Text>{negative ? "-" : ""}Rs. {formatNumber(value)}</Text>;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#111111",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    paddingTop: 116,
    paddingRight: 24,
    paddingBottom: 34,
    paddingLeft: 24,
  },
  fixedHeader: {
    position: "absolute",
    top: 24,
    left: 24,
    right: 24,
    border: "1 solid #111111",
    backgroundColor: "#ffffff",
  },
  topHeader: {
    minHeight: 52,
    padding: 8,
    borderBottom: "1 solid #111111",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 38,
    height: 38,
    objectFit: "contain",
  },
  brandName: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  tagline: {
    marginTop: 2,
    fontSize: 8.5,
  },
  invoiceTitle: {
    textAlign: "right",
  },
  titleText: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  mutedSmall: {
    marginTop: 2,
    fontSize: 8,
    color: "#444444",
  },
  repeatInfo: {
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  repeatText: {
    fontSize: 8.5,
  },
  invoiceShell: {
    border: "1 solid #111111",
  },
  twoCol: {
    flexDirection: "row",
    borderBottom: "1 solid #111111",
  },
  cellHalf: {
    width: "50%",
    padding: 4,
  },
  cellHalfBorder: {
    width: "50%",
    padding: 4,
    borderRight: "1 solid #111111",
  },
  sectionTitle: {
    marginBottom: 5,
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  sellerName: {
    marginBottom: 4,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  line: {
    marginBottom: 3,
    lineHeight: 1,
  },
  label: {
    fontFamily: "Helvetica-Bold",
  },
  customerName: {
    marginBottom: 4,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  address: {
    lineHeight: 1,
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderBottom: "1 solid #111111",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #111111",
    minHeight: 30,
  },
  th: {
    padding: 6,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    borderRight: "1 solid #111111",
  },
  td: {
    padding: 6,
    borderRight: "1 solid #111111",
    lineHeight: 1.3,
  },
  tdCenter: {
    padding: 6,
    textAlign: "center",
    borderRight: "1 solid #111111",
  },
  tdRight: {
    padding: 6,
    textAlign: "right",
    borderRight: "1 solid #111111",
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  colSr: {
    width: "8%",
  },
  colProduct: {
    width: "42%",
  },
  colQty: {
    width: "8%",
  },
  colVariant: {
    width: "10%",
  },
  colPrice: {
    width: "12%",
  },
  colGst: {
    width: "8%",
  },
  colTotal: {
    width: "12%",
  },
  productName: {
    fontFamily: "Helvetica-Bold",
  },
  totalsWrap: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottom: "1 solid #111111",
  },
  totalsBox: {
    width: 250,
    borderLeft: "1 solid #111111",
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottom: "1 solid #111111",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  declaration: {
    flexDirection: "row",
    minHeight: 118,
  },
  declarationLeft: {
    width: "50%",
    padding: 9,
    borderRight: "1 solid #111111",
  },
  declarationRight: {
    width: "50%",
    padding: 9,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  signatureSpace: {
    height: 42,
  },
  signatureLine: {
    paddingTop: 4,
    borderTop: "1 solid #111111",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 14,
    textAlign: "center",
    fontSize: 8,
    color: "#555555",
  },
});

export default function InvoicePDF({ orderData }) {
  const address = buildAddress(orderData?.address);

  return (
    <Document title={`Invoice-${orderData?.orderId || ""}`}>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.fixedHeader} fixed>
          <View style={styles.topHeader}>
            <View style={styles.brandBlock}>
              <Image src={logo} style={styles.logo} />
              <View>
                <Text style={styles.brandName}>Melforesta</Text>
                <Text style={styles.tagline}>From Hives To Home</Text>
              </View>
            </View>

            <View style={styles.invoiceTitle}>
              <Text style={styles.titleText}>TAX INVOICE</Text>
              <Text style={styles.mutedSmall}>Original For Recipient</Text>
            </View>
          </View>

          <View style={styles.repeatInfo}>
            <Text style={styles.repeatText}>Invoice No: INV-{orderData.orderId}</Text>
            <Text style={styles.repeatText}>Order ID: #{orderData.orderId}</Text>
            <Text style={styles.repeatText}>Invoice Date: {formatDate(orderData.createdAt)}</Text>
          </View>

        </View>

        <View style={styles.invoiceShell}>
          <View style={styles.twoCol}>
            <View style={styles.cellHalfBorder}>
              <Text style={styles.sectionTitle}>Sold By / Seller</Text>
              <Text style={styles.sellerName}>SK FOODS AND SPICES PRIVATE LIMITED</Text>
              <Text style={styles.line}>
                SHOP NO 02 BUILDING A KONARK TOWER II BALEWADI, Pune City,
                Maharashtra, India - 411045.
              </Text>
            </View>

            <View style={styles.cellHalf}>
              <Text style={styles.line}>
                <Text style={styles.label}>GSTIN - </Text>
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>CIN - </Text>
                U01400PN2016PTC167284
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>PAN - </Text>
              </Text>
            </View>
          </View>

          {/* <View style={styles.twoCol}>
            <View style={styles.cellHalfBorder}>
              <Text style={styles.line}>
                <Text style={styles.label}>Invoice Date: </Text>
                {formatDate(orderData.createdAt)}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Place of Supply: </Text>
                Maharashtra
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Payment Method: </Text>
                {orderData.paymentMethod?.toUpperCase()}
              </Text>
            </View>

            <View style={styles.cellHalf}>
              <Text style={styles.line}>
                <Text style={styles.label}>Invoice No: </Text>
                INV-{orderData.orderId}
              </Text>
              <Text style={styles.line}>
                <Text style={styles.label}>Order ID: </Text>
                #{orderData.orderId}
              </Text>
            </View>
          </View> */}

          <View style={styles.twoCol}>
            <View style={styles.cellHalfBorder}>
              <Text style={styles.sectionTitle}>Bill To</Text>
              <Text style={styles.customerName}>{orderData.user.name}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>

            <View style={styles.cellHalf}>
              <Text style={styles.sectionTitle}>Ship To</Text>
              <Text style={styles.customerName}>{orderData.user.name}</Text>
              <Text style={styles.address}>{address}</Text>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, styles.colSr]}>Sr.</Text>
              <Text style={[styles.th, styles.colProduct]}>Product Description</Text>
              <Text style={[styles.th, styles.colQty]}>Qty</Text>
              <Text style={[styles.th, styles.colVariant]}>Variant</Text>
              <Text style={[styles.th, styles.colPrice]}>Price</Text>
              <Text style={[styles.th, styles.colGst]}>GST</Text>
              <Text style={[styles.th, styles.colTotal, styles.noRightBorder]}>Total</Text>
            </View>

            {orderData.items.map((item, index) => (
              <View key={`${item.product?.productName}-${index}`} style={styles.tableRow} wrap={false}>
                <Text style={[styles.tdCenter, styles.colSr]}>{index + 1}</Text>
                <View style={[styles.td, styles.colProduct]}>
                  <Text style={styles.productName}>{item.product?.productName}</Text>
                </View>
                <Text style={[styles.tdCenter, styles.colQty]}>{item.quantity}</Text>
                <Text style={[styles.tdCenter, styles.colVariant]}>{item.variant?.weight}</Text>
                <Text style={[styles.tdRight, styles.colPrice]}>
                  <Money value={item.price} />
                </Text>
                <Text style={[styles.tdCenter, styles.colGst]}>{item.product?.gstPercent}%</Text>
                <Text style={[styles.tdRight, styles.colTotal, styles.noRightBorder]}>
                  <Money value={item.totalPrice} />
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.totalsWrap} wrap={false}>
            <View style={styles.totalsBox}>
              <View style={styles.totalLine}>
                <Text>Subtotal</Text>
                <Money value={orderData.subTotal} />
              </View>
              <View style={styles.totalLine}>
                <Text>GST</Text>
                <Money value={orderData.gstAmount} />
              </View>
              <View style={styles.totalLine}>
                <Text>Handling Charges</Text>
                <Money value={orderData.handlingCharges} />
              </View>
              <View style={styles.totalLine}>
                <Text>Discount</Text>
                <Money value={orderData.discountAmount} negative />
              </View>
              <View style={styles.grandTotal}>
                <Text>Total Paid</Text>
                <Money value={orderData.totalAmount} />
              </View>
            </View>
          </View>

          <View style={styles.declaration} wrap={false}>
            <View style={styles.declarationLeft}>
              <Text style={styles.line}>Thank you for shopping with Melforesta.</Text>
            </View>

            <View style={styles.declarationRight}>
              <Text style={styles.label}>For Melforesta</Text>
              <View style={styles.signatureSpace} />
              <Text style={styles.signatureLine}>Authorized Signature</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          This is a computer generated invoice.
        </Text>
      </Page>
    </Document>
  );
}
