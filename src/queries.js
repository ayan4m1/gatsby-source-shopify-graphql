import { types } from './types';

const order = `
query {
  orders(first: 100) {
    edges {
      node {
        billingAddress {
          address1
          address2
          city
          company
          country
          countryCodeV2
          firstName
          id
          lastName
          latitude
          longitude
          name
          phone
          province
          provinceCode
          zip
        }
        billingAddressMatchesShippingAddress
        canMarkAsPaid
        canNotifyCustomer
        cancelReason
        cancelledAt
        capturable
        cartDiscountAmountSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        clientIp
        closed
        closedAt
        confirmed
        createdAt
        currencyCode
        currentTotalDutiesSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        customer {
          acceptsMarketing
          acceptsMarketingUpdatedAt
          averageOrderAmountV2 {
            amount
            currencyCode
          }
          canDelete
          createdAt
          displayName
          email
          firstName
          hasNote
          hasTimelineComment
          id
          lastName
          legacyResourceId
          lifetimeDuration
          locale
          marketingOptInLevel
          note
          ordersCount
          phone
          state
          tags
          taxExempt
          totalSpentV2 {
            amount
            currencyCode
          }
          updatedAt
          validEmailAddress
          verifiedEmail
        }
        discountCode
        displayFinancialStatus
        displayFulfillmentStatus
        edited
        email
        fulfillable
        fullyPaid
        hasTimelineComment
        id
        legacyResourceId
        merchantEditable
        name
        netPaymentSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        note
        originalTotalDutiesSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        originalTotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        paymentGatewayNames
        phone
        processedAt
        refundDiscrepancySet {
          shopMoney {
            amount
            currencyCode
          }
        }
        refundable
        requiresShipping
        restockable
        subtotalLineItemsQuantity
        subtotalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        tags
        taxesIncluded
        totalCapturableSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalDiscountsSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalOutstandingSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalReceivedSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalRefundedSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalShippingPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalTaxSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalTipReceived {
          amount
          currencyCode
        }
        totalWeight
        unpaid
        updatedAt
        lineItems(first: 50) {
          edges {
            node {
              id
              quantity
              product {
                createdAt
                description
                descriptionHtml
                giftCardTemplateSuffix
                handle
                hasOnlyDefaultVariant
                hasOutOfStockVariants
                id
                isGiftCard
                legacyResourceId
                mediaCount
                onlineStorePreviewUrl
                onlineStoreUrl
                options {
                  id
                  name
                  position
                  values
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                productType
                publishedAt
                seo {
                  description
                  title
                }
                storefrontId
                tags
                templateSuffix
                title
                totalInventory
                totalVariants
                tracksInventory
                updatedAt
                vendor
              }
              variant {
                availableForSale
                barcode
                compareAtPrice
                createdAt
                displayName
                id
                inventoryPolicy
                inventoryQuantity
                legacyResourceId
                position
                price
                sku
                storefrontId
                taxCode
                taxable
                title
                updatedAt
                weight
                weightUnit
              }
            }
          }
        }
      }
    }
  }
}
`;

const product = `
query {
  products(first: 100) {
    edges {
      node {
        createdAt
        description
        descriptionHtml
        giftCardTemplateSuffix
        handle
        hasOnlyDefaultVariant
        hasOutOfStockVariants
        id
        isGiftCard
        legacyResourceId
        mediaCount
        metafields(first: 100) {
          edges {
            node {
              id
              key
              legacyResourceId
              namespace
              updatedAt
              value
              valueType
            }
          }
        }
        onlineStorePreviewUrl
        onlineStoreUrl
        options {
          id
          name
          position
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        productType
        publishedAt
        seo {
          description
          title
        }
        storefrontId
        tags
        templateSuffix
        title
        totalInventory
        totalVariants
        tracksInventory
        updatedAt
        variants(first: 50) {
          edges {
            node {
              availableForSale
              barcode
              compareAtPrice
              createdAt
              displayName
              id
              inventoryPolicy
              inventoryQuantity
              legacyResourceId
              position
              price
              sku
              storefrontId
              taxCode
              taxable
              title
              updatedAt
              weight
              weightUnit
            }
          }
        }
        vendor
      }
    }
  }
}
`;

export default {
  [types.order]: order,
  [types.product]: product
};
