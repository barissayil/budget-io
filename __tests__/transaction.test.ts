import prisma from "@db/prisma";
import {
  createTransaction,
  getCategories,
  getDetails,
  getSubcategories,
  getTransactionsOfMonth,
} from "@lib/db/transaction";
import { Transaction, TransactionType } from "@prisma/client";
import dayjs from "dayjs";

const userEmail = "barissayil@protonmail.com";

const today = dayjs().format().substring(0, 10);
const firstOfCurrentMonth = today.slice(0, 8) + "01";
const twentiethOfCurrentMonth = today.slice(0, 8) + "20";
const oneMonthAgo = dayjs().subtract(1, "month").format().substring(0, 10);

let spending10FoodOrderDominosToday: Transaction;
let spending12p5FoodOrderBurgerKingToday: Transaction;
let spending20FoodRestaurantPNYToday: Transaction;
let spending1000HousingRentLodgisToday: Transaction;
let spending50ClothingTurtleneckUniqloToday: Transaction;
let spending10ClothingShirtUniqloToday: Transaction;
let spending10ClothingShirtCelioToday: Transaction;
let spending22p57FoodGroceriesMonoprixFirstCurrentMonth: Transaction;
let spending17p03FoodGroceriesCasinoTwentiethCurrentMonth: Transaction;
let spending1000HousingRentLodgisOneMonthAgo: Transaction;
let spending1255p44TransitAirplaneTurkeyOneMonthAgo: Transaction;

describe("spendings (soon: transactions)", () => {
  beforeAll(async () => {
    await prisma.$transaction([
      prisma.account.deleteMany(),
      prisma.session.deleteMany(),
      prisma.transaction.deleteMany(),
      prisma.user.deleteMany(),
      prisma.verificationToken.deleteMany(),
    ]);

    await prisma.user.create({ data: { email: userEmail } });
  });
  describe("initial state", () => {
    it("should have no spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([]);
    });
    it("should have no spendings in previous month", async () => {
      const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, 1);
      expect(transactionsOfPreviousMonth).toEqual([]);
    });
    it("should have no categories", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual([]);
    });
    it("should have no subcategories", async () => {
      const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Food");
      expect(subcategories).toEqual([]);
    });
    it("should have no details", async () => {
      const details = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Order");
      expect(details).toEqual([]);
    });
  });
  describe("creating a spending", () => {
    it("should create spending", async () => {
      spending10FoodOrderDominosToday = await createTransaction(userEmail, {
        date: today,
        amount: 10,
        type: TransactionType.SPENDING,
        category: "Food",
        subcategory: "Order",
        details: "Dominos",
      });
      expect(spending10FoodOrderDominosToday.date).toEqual(today);
      expect(spending10FoodOrderDominosToday.amount).toEqual(10);
      expect(spending10FoodOrderDominosToday.type).toEqual(TransactionType.SPENDING);
      expect(spending10FoodOrderDominosToday.category).toEqual("Food");
      expect(spending10FoodOrderDominosToday.subcategory).toEqual("Order");
      expect(spending10FoodOrderDominosToday.details).toEqual("Dominos");
    });
    it("should have only this spending in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([spending10FoodOrderDominosToday]);
    });
    it("should have only this spending's category", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual([spending10FoodOrderDominosToday.category]);
    });
    it("should have only this spending's subcategory", async () => {
      const categories = await getSubcategories(
        userEmail,
        TransactionType.SPENDING,
        spending10FoodOrderDominosToday.category
      );
      expect(categories).toEqual([spending10FoodOrderDominosToday.subcategory]);
    });
    it("should have only this spending's details", async () => {
      const categories = await getDetails(
        userEmail,
        TransactionType.SPENDING,
        spending10FoodOrderDominosToday.category,
        spending10FoodOrderDominosToday.subcategory
      );
      expect(categories).toEqual([spending10FoodOrderDominosToday.details]);
    });
  });
  describe("creating a spending with floating point amount", () => {
    it("should create spending", async () => {
      spending12p5FoodOrderBurgerKingToday = await createTransaction(userEmail, {
        date: today,
        amount: 12.5,
        type: TransactionType.SPENDING,
        category: "Food",
        subcategory: "Order",
        details: "BurgerKing",
      });
      expect(spending12p5FoodOrderBurgerKingToday.date).toEqual(today);
      expect(spending12p5FoodOrderBurgerKingToday.amount).toEqual(12.5);
      expect(spending12p5FoodOrderBurgerKingToday.type).toEqual(TransactionType.SPENDING);
      expect(spending12p5FoodOrderBurgerKingToday.category).toEqual("Food");
      expect(spending12p5FoodOrderBurgerKingToday.subcategory).toEqual("Order");
      expect(spending12p5FoodOrderBurgerKingToday.details).toEqual("BurgerKing");
    });
    it("should get spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([
        spending10FoodOrderDominosToday,
        spending12p5FoodOrderBurgerKingToday,
      ]);
    });
    it("should get categories", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual(["Food"]);
    });
    it("should get subcategories", async () => {
      const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Food");
      expect(subcategories).toEqual(["Order"]);
    });
    it("should get details", async () => {
      const details = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Order");
      expect(details).toEqual(["Dominos", "BurgerKing"]);
    });
  });
  describe("creating many spendings", () => {
    it("should create many spendings", async () => {
      spending1000HousingRentLodgisToday = await createTransaction(userEmail, {
        date: today,
        amount: 1000,
        type: TransactionType.SPENDING,
        category: "Housing",
        subcategory: "Rent",
        details: "Lodgis",
      });
      spending50ClothingTurtleneckUniqloToday = await createTransaction(userEmail, {
        date: today,
        amount: 50,
        type: TransactionType.SPENDING,
        category: "Clothing",
        subcategory: "Turtleneck",
        details: "Uniqlo",
      });
      spending20FoodRestaurantPNYToday = await createTransaction(userEmail, {
        date: today,
        amount: 20,
        type: TransactionType.SPENDING,
        category: "Food",
        subcategory: "Restaurant",
        details: "PNY",
      });
      spending10ClothingShirtUniqloToday = await createTransaction(userEmail, {
        date: today,
        amount: 10,
        type: TransactionType.SPENDING,
        category: "Clothing",
        subcategory: "Shirt",
        details: "Uniqlo",
      });
      spending10ClothingShirtCelioToday = await createTransaction(userEmail, {
        date: today,
        amount: 10,
        type: TransactionType.SPENDING,
        category: "Clothing",
        subcategory: "Shirt",
        details: "Celio",
      });
    });
    it("should get spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([
        spending10FoodOrderDominosToday,
        spending12p5FoodOrderBurgerKingToday,
        spending1000HousingRentLodgisToday,
        spending50ClothingTurtleneckUniqloToday,
        spending20FoodRestaurantPNYToday,
        spending10ClothingShirtUniqloToday,
        spending10ClothingShirtCelioToday,
      ]);
    });
    it("should get categories", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual(["Food", "Housing", "Clothing"]);
    });
    it("should get subcategories", async () => {
      const subcategoriesFood = await getSubcategories(userEmail, TransactionType.SPENDING, "Food");
      expect(subcategoriesFood).toEqual(["Order", "Restaurant"]);
      const subcategoriesHousing = await getSubcategories(
        userEmail,
        TransactionType.SPENDING,
        "Housing"
      );
      expect(subcategoriesHousing).toEqual(["Rent"]);
      const subcategoriesClothing = await getSubcategories(
        userEmail,
        TransactionType.SPENDING,
        "Clothing"
      );
      expect(subcategoriesClothing).toEqual(["Turtleneck", "Shirt"]);
    });
    it("should get details", async () => {
      const detailsOrder = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Order");
      expect(detailsOrder).toEqual(["Dominos", "BurgerKing"]);
      const detailsRent = await getDetails(userEmail, TransactionType.SPENDING, "Housing", "Rent");
      expect(detailsRent).toEqual(["Lodgis"]);
      const detailsTurtleneck = await getDetails(
        userEmail,
        TransactionType.SPENDING,
        "Clothing",
        "Turtleneck"
      );
      expect(detailsTurtleneck).toEqual(["Uniqlo"]);
      const detailsRestaurant = await getDetails(
        userEmail,
        TransactionType.SPENDING,
        "Food",
        "Restaurant"
      );
      expect(detailsRestaurant).toEqual(["PNY"]);
      const detailsShirt = await getDetails(
        userEmail,
        TransactionType.SPENDING,
        "Clothing",
        "Shirt"
      );
      expect(detailsShirt).toEqual(["Uniqlo", "Celio"]);
    });
  });
  describe("different dates in current month", () => {
    it("should create spending which took place on first of current month", async () => {
      spending22p57FoodGroceriesMonoprixFirstCurrentMonth = await createTransaction(userEmail, {
        date: firstOfCurrentMonth,
        amount: 22.57,
        type: TransactionType.SPENDING,
        category: "Food",
        subcategory: "Groceries",
        details: "Monoprix",
      });
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.date).toEqual(firstOfCurrentMonth);
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.amount).toEqual(22.57);
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.type).toEqual(
        TransactionType.SPENDING
      );
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.category).toEqual("Food");
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.subcategory).toEqual("Groceries");
      expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.details).toEqual("Monoprix");
    });
    it("should create spending which took place on twentieth of current month", async () => {
      spending17p03FoodGroceriesCasinoTwentiethCurrentMonth = await createTransaction(userEmail, {
        date: twentiethOfCurrentMonth,
        amount: 17.03,
        type: TransactionType.SPENDING,
        category: "Food",
        subcategory: "Groceries",
        details: "Casino",
      });
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.date).toEqual(
        twentiethOfCurrentMonth
      );
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.amount).toEqual(17.03);
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.type).toEqual(
        TransactionType.SPENDING
      );
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.category).toEqual("Food");
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.subcategory).toEqual(
        "Groceries"
      );
      expect(spending17p03FoodGroceriesCasinoTwentiethCurrentMonth.details).toEqual("Casino");
    });
    it("should get spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([
        spending10FoodOrderDominosToday,
        spending12p5FoodOrderBurgerKingToday,
        spending1000HousingRentLodgisToday,
        spending50ClothingTurtleneckUniqloToday,
        spending20FoodRestaurantPNYToday,
        spending10ClothingShirtUniqloToday,
        spending10ClothingShirtCelioToday,
        spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
        spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
      ]);
    });
    it("should get categories", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual(["Food", "Housing", "Clothing"]);
    });
    it("should get subcategories", async () => {
      const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Food");
      expect(subcategories).toEqual(["Order", "Restaurant", "Groceries"]);
    });
    it("should get details", async () => {
      const details = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Groceries");
      expect(details).toEqual(["Monoprix", "Casino"]);
    });
  });
  describe("different dates in previous month", () => {
    it("should create spending which took place one month ago", async () => {
      spending1000HousingRentLodgisOneMonthAgo = await createTransaction(userEmail, {
        date: oneMonthAgo,
        amount: 1000,
        type: TransactionType.SPENDING,
        category: "Housing",
        subcategory: "Rent",
        details: "Lodgis",
      });
      expect(spending1000HousingRentLodgisOneMonthAgo.date).toEqual(oneMonthAgo);
      expect(spending1000HousingRentLodgisOneMonthAgo.amount).toEqual(1000);
      expect(spending1000HousingRentLodgisOneMonthAgo.type).toEqual(TransactionType.SPENDING);
      expect(spending1000HousingRentLodgisOneMonthAgo.category).toEqual("Housing");
      expect(spending1000HousingRentLodgisOneMonthAgo.subcategory).toEqual("Rent");
      expect(spending1000HousingRentLodgisOneMonthAgo.details).toEqual("Lodgis");
    });
    it("should create spending with new category which took place one month ago", async () => {
      spending1255p44TransitAirplaneTurkeyOneMonthAgo = await createTransaction(userEmail, {
        date: oneMonthAgo,
        amount: 1255.44,
        type: TransactionType.SPENDING,
        category: "Transit",
        subcategory: "Airplane",
        details: "Turkey",
      });
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.date).toEqual(oneMonthAgo);
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.amount).toEqual(1255.44);
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.type).toEqual(
        TransactionType.SPENDING
      );
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.category).toEqual("Transit");
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.subcategory).toEqual("Airplane");
      expect(spending1255p44TransitAirplaneTurkeyOneMonthAgo.details).toEqual("Turkey");
    });
    it("should get spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([
        spending10FoodOrderDominosToday,
        spending12p5FoodOrderBurgerKingToday,
        spending1000HousingRentLodgisToday,
        spending50ClothingTurtleneckUniqloToday,
        spending20FoodRestaurantPNYToday,
        spending10ClothingShirtUniqloToday,
        spending10ClothingShirtCelioToday,
        spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
        spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
      ]);
    });
    it("should get spendings in previous month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 1);
      expect(transactionsOfCurrentMonth).toEqual([
        spending1000HousingRentLodgisOneMonthAgo,
        spending1255p44TransitAirplaneTurkeyOneMonthAgo,
      ]);
    });
    it("should get categories", async () => {
      const categories = await getCategories(userEmail, TransactionType.SPENDING);
      expect(categories).toEqual(["Food", "Housing", "Clothing", "Transit"]);
    });
    it("should get subcategories of new category", async () => {
      const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Transit");
      expect(subcategories).toEqual(["Airplane"]);
    });
    it("should get details of new subcategory", async () => {
      const details = await getDetails(userEmail, TransactionType.SPENDING, "Transit", "Airplane");
      expect(details).toEqual(["Turkey"]);
    });
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("updating spendings", () => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("deleting spendings", () => {});
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  describe("different user", () => {});
});
