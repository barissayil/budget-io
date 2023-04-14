import prisma from "@db/prisma";
import {
  createTransaction,
  deleteTransaction,
  getCategories,
  getDetails,
  getSubcategories,
  getTransactionsOfMonth,
  updateTransaction,
} from "@lib/db/transaction";
import { Transaction, TransactionType } from "@prisma/client";
import dayjs from "dayjs";

describe("transactions", () => {
  const userEmail = "user@test.com";
  const differentUserEmail = "different-user@test.com";

  const today = dayjs().format().substring(0, 10);
  const firstOfCurrentMonth = today.slice(0, 8) + "01";
  const twentiethOfCurrentMonth = today.slice(0, 8) + "20";
  const oneMonthAgo = dayjs().subtract(1, "month").format().substring(0, 10);
  const oneMonthLater = dayjs().add(1, "month").format().substring(0, 10);

  let spending10FoodOrderDominosToday: Transaction;
  let spending12p5FoodOrderBurgerKingToday: Transaction;
  let spending24p99FoodRestaurantOliveChickenToday: Transaction;
  let spending20FoodRestaurantPNYToday: Transaction;
  let spending1000HousingRentLodgisToday: Transaction;
  let spending50ClothingTurtleneckUniqloToday: Transaction;
  let spending10ClothingShirtUniqloToday: Transaction;
  let spending10ClothingShirtCelioToday: Transaction;
  let earning8000SalaryPermanentCompanyXToday: Transaction;
  let spending22p57FoodGroceriesMonoprixFirstCurrentMonth: Transaction;
  let spending17p03FoodGroceriesCasinoTwentiethCurrentMonth: Transaction;
  let spending1000HousingRentLodgisOneMonthAgo: Transaction;
  let spending1255p44TransitAirplaneTurkeyOneMonthAgo: Transaction;
  let spending20FoodOrderDominosToday: Transaction;
  let spending1255p44TravelAirplaneTurkeyOneMonthAgo: Transaction;
  let spending12p5ClothingJeansBonoboToday: Transaction;
  let spending10ClothingShirtUniqloOneMonthAgo: Transaction;
  let spending999p99ElectronicsComputerSamsungOneMonthLater: Transaction;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: { contains: "@test.com" } } });
    await prisma.user.createMany({ data: [{ email: userEmail }, { email: differentUserEmail }] });
  });
  describe("initial state", () => {
    it("should have no spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([]);
    });
    it("should have no spendings in previous month", async () => {
      const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
      expect(transactionsOfPreviousMonth).toEqual([]);
    });
    it("should have no spendings in next month", async () => {
      const transactionsOfNextMonth = await getTransactionsOfMonth(userEmail, 1);
      expect(transactionsOfNextMonth).toEqual([]);
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
  describe("creating", () => {
    describe("spending", () => {
      it("should create spending", async () => {
        spending10FoodOrderDominosToday = await createTransaction(userEmail, {
          date: today,
          amount: 10,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Order",
          details: "Dominos",
        });
        expect(spending10FoodOrderDominosToday.userEmail).toEqual(userEmail);
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
    describe("spending with floating point amount", () => {
      it("should create spending", async () => {
        spending12p5FoodOrderBurgerKingToday = await createTransaction(userEmail, {
          date: today,
          amount: 12.5,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Order",
          details: "BurgerKing",
        });
        expect(spending12p5FoodOrderBurgerKingToday.userEmail).toEqual(userEmail);
        expect(spending12p5FoodOrderBurgerKingToday.date).toEqual(today);
        expect(spending12p5FoodOrderBurgerKingToday.amount).toEqual(12.5);
        expect(spending12p5FoodOrderBurgerKingToday.type).toEqual(TransactionType.SPENDING);
        expect(spending12p5FoodOrderBurgerKingToday.category).toEqual("Food");
        expect(spending12p5FoodOrderBurgerKingToday.subcategory).toEqual("Order");
        expect(spending12p5FoodOrderBurgerKingToday.details).toEqual("BurgerKing");
      });
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
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
        expect(details).toIncludeAllMembers(["Dominos", "BurgerKing"]);
      });
    });
    describe("many spendings", () => {
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
        spending24p99FoodRestaurantOliveChickenToday = await createTransaction(userEmail, {
          date: today,
          amount: 24.99,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Restaurant",
          details: "Olive Chicken",
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
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending10FoodOrderDominosToday,
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing"]);
      });
      it("should get subcategories", async () => {
        const subcategoriesFood = await getSubcategories(
          userEmail,
          TransactionType.SPENDING,
          "Food"
        );
        expect(subcategoriesFood).toIncludeAllMembers(["Order", "Restaurant"]);
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
        expect(subcategoriesClothing).toIncludeAllMembers(["Turtleneck", "Shirt"]);
      });
      it("should get details", async () => {
        const detailsOrder = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Order");
        expect(detailsOrder).toIncludeAllMembers(["Dominos", "BurgerKing"]);
        const detailsRent = await getDetails(
          userEmail,
          TransactionType.SPENDING,
          "Housing",
          "Rent"
        );
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
        expect(detailsRestaurant).toIncludeAllMembers(["PNY", "Olive Chicken"]);
        const detailsShirt = await getDetails(
          userEmail,
          TransactionType.SPENDING,
          "Clothing",
          "Shirt"
        );
        expect(detailsShirt).toIncludeAllMembers(["Uniqlo", "Celio"]);
      });
    });

    describe("earning", () => {
      it("should create earning", async () => {
        earning8000SalaryPermanentCompanyXToday = await createTransaction(userEmail, {
          date: today,
          amount: 8000,
          type: TransactionType.EARNING,
          category: "Salary",
          subcategory: "Permanent",
          details: "Company X",
        });
      });
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending10FoodOrderDominosToday,
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          earning8000SalaryPermanentCompanyXToday,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.EARNING);
        expect(categories).toIncludeAllMembers(["Salary"]);
      });
      it("should get subcategories", async () => {
        const subcategories = await getSubcategories(userEmail, TransactionType.EARNING, "Salary");
        expect(subcategories).toIncludeAllMembers(["Permanent"]);
      });
      it("should get details", async () => {
        const details = await getDetails(userEmail, TransactionType.EARNING, "Salary", "Permanent");
        expect(details).toIncludeAllMembers(["Company X"]);
      });
    });
    describe("spendings with different dates in current month", () => {
      it("should create spending which took place on first of current month", async () => {
        spending22p57FoodGroceriesMonoprixFirstCurrentMonth = await createTransaction(userEmail, {
          date: firstOfCurrentMonth,
          amount: 22.57,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Groceries",
          details: "Monoprix",
        });
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.userEmail).toEqual(userEmail);
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.date).toEqual(
          firstOfCurrentMonth
        );
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.amount).toEqual(22.57);
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.type).toEqual(
          TransactionType.SPENDING
        );
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.category).toEqual("Food");
        expect(spending22p57FoodGroceriesMonoprixFirstCurrentMonth.subcategory).toEqual(
          "Groceries"
        );
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
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending10FoodOrderDominosToday,
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing"]);
      });
      it("should get subcategories", async () => {
        const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Food");
        expect(subcategories).toIncludeAllMembers(["Order", "Restaurant", "Groceries"]);
      });
      it("should get details", async () => {
        const details = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Groceries");
        expect(details).toIncludeAllMembers(["Monoprix", "Casino"]);
      });
    });
    describe("spendings with different dates in previous month", () => {
      it("should create spending which took place one month ago", async () => {
        spending1000HousingRentLodgisOneMonthAgo = await createTransaction(userEmail, {
          date: oneMonthAgo,
          amount: 1000,
          type: TransactionType.SPENDING,
          category: "Housing",
          subcategory: "Rent",
          details: "Lodgis",
        });
        expect(spending1000HousingRentLodgisOneMonthAgo.userEmail).toEqual(userEmail);
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
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending10FoodOrderDominosToday,
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
        ]);
      });
      it("should get transactions in previous month", async () => {
        const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
        expect(transactionsOfPreviousMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisOneMonthAgo,
          spending1255p44TransitAirplaneTurkeyOneMonthAgo,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing", "Transit"]);
      });
      it("should get subcategories of new category", async () => {
        const subcategories = await getSubcategories(
          userEmail,
          TransactionType.SPENDING,
          "Transit"
        );
        expect(subcategories).toEqual(["Airplane"]);
      });
      it("should get details of new subcategory", async () => {
        const details = await getDetails(
          userEmail,
          TransactionType.SPENDING,
          "Transit",
          "Airplane"
        );
        expect(details).toEqual(["Turkey"]);
      });
    });
    describe("spending in next month", () => {
      it("should create spending with new category which took place one later ago", async () => {
        spending999p99ElectronicsComputerSamsungOneMonthLater = await createTransaction(userEmail, {
          date: oneMonthLater,
          amount: 999.99,
          type: TransactionType.SPENDING,
          category: "Electronics",
          subcategory: "Computer",
          details: "Samsung",
        });
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.userEmail).toEqual(userEmail);
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.date).toEqual(oneMonthLater);
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.amount).toEqual(999.99);
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.type).toEqual(
          TransactionType.SPENDING
        );
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.category).toEqual(
          "Electronics"
        );
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.subcategory).toEqual(
          "Computer"
        );
        expect(spending999p99ElectronicsComputerSamsungOneMonthLater.details).toEqual("Samsung");
      });
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending10FoodOrderDominosToday,
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
        ]);
      });
      it("should get transactions in previous month", async () => {
        const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
        expect(transactionsOfPreviousMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisOneMonthAgo,
          spending1255p44TransitAirplaneTurkeyOneMonthAgo,
        ]);
      });
      it("should get transactions in next month", async () => {
        const transactionsOfNextMonth = await getTransactionsOfMonth(userEmail, 1);
        expect(transactionsOfNextMonth).toIncludeAllMembers([
          spending999p99ElectronicsComputerSamsungOneMonthLater,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).toIncludeAllMembers([
          "Food",
          "Housing",
          "Clothing",
          "Transit",
          "Electronics",
        ]);
      });
      it("should get subcategories of new category", async () => {
        const subcategories = await getSubcategories(
          userEmail,
          TransactionType.SPENDING,
          "Electronics"
        );
        expect(subcategories).toEqual(["Computer"]);
      });
      it("should get details of new subcategory", async () => {
        const details = await getDetails(
          userEmail,
          TransactionType.SPENDING,
          "Electronics",
          "Computer"
        );
        expect(details).toEqual(["Samsung"]);
      });
    });
  });
  describe("updating", () => {
    describe("amount", () => {
      it("should update amount", async () => {
        spending20FoodOrderDominosToday = await updateTransaction(
          spending10FoodOrderDominosToday.id,
          userEmail,
          {
            date: today,
            amount: 20,
            type: TransactionType.SPENDING,
            category: "Food",
            subcategory: "Order",
            details: "Dominos",
          }
        );
        expect(spending20FoodOrderDominosToday.id).toEqual(spending10FoodOrderDominosToday.id);
        expect(spending20FoodOrderDominosToday.userEmail).toEqual(userEmail);
        expect(spending20FoodOrderDominosToday.userId).toEqual(
          spending10FoodOrderDominosToday.userId
        );
        expect(spending20FoodOrderDominosToday.date).toEqual(today);
        expect(spending20FoodOrderDominosToday.amount).toEqual(20);
        expect(spending20FoodOrderDominosToday.type).toEqual(TransactionType.SPENDING);
        expect(spending20FoodOrderDominosToday.category).toEqual("Food");
        expect(spending20FoodOrderDominosToday.subcategory).toEqual("Order");
        expect(spending20FoodOrderDominosToday.details).toEqual("Dominos");
      });
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending12p5FoodOrderBurgerKingToday,
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
          spending20FoodOrderDominosToday,
        ]);
      });
    });
    describe("category to new category, with no other with the previous category", () => {
      it("should update category", async () => {
        spending1255p44TravelAirplaneTurkeyOneMonthAgo = await updateTransaction(
          spending1255p44TransitAirplaneTurkeyOneMonthAgo.id,
          userEmail,
          {
            date: oneMonthAgo,
            amount: 1255.44,
            type: TransactionType.SPENDING,
            category: "Travel",
            subcategory: "Airplane",
            details: "Turkey",
          }
        );
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.date).toEqual(oneMonthAgo);
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.amount).toEqual(1255.44);
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.type).toEqual(
          TransactionType.SPENDING
        );
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.category).toEqual("Travel");
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.subcategory).toEqual("Airplane");
        expect(spending1255p44TravelAirplaneTurkeyOneMonthAgo.details).toEqual("Turkey");
      });
      it("should get transactions in previous month", async () => {
        const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
        expect(transactionsOfPreviousMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisOneMonthAgo,
          spending1255p44TravelAirplaneTurkeyOneMonthAgo,
        ]);
      });
      it("should get categories, including new one but not previous one", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).not.toIncludeAnyMembers(["Transit"]);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing", "Travel"]);
      });
      it("should get subcategories", async () => {
        const subcategories = await getSubcategories(userEmail, TransactionType.SPENDING, "Travel");
        expect(subcategories).toEqual(["Airplane"]);
      });
      it("should get details", async () => {
        const details = await getDetails(userEmail, TransactionType.SPENDING, "Travel", "Airplane");
        expect(details).toEqual(["Turkey"]);
      });
    });
    describe("category, subcategory, details", () => {
      it("should update category, subcategory, details", async () => {
        spending12p5ClothingJeansBonoboToday = await updateTransaction(
          spending12p5FoodOrderBurgerKingToday.id,
          userEmail,
          {
            date: today,
            amount: 12.5,
            type: TransactionType.SPENDING,
            category: "Clothing",
            subcategory: "Jeans",
            details: "Bonobo",
          }
        );
        expect(spending12p5ClothingJeansBonoboToday.id).toEqual(
          spending12p5FoodOrderBurgerKingToday.id
        );
        expect(spending12p5ClothingJeansBonoboToday.userEmail).toEqual(userEmail);
        expect(spending12p5ClothingJeansBonoboToday.userId).toEqual(
          spending12p5FoodOrderBurgerKingToday.userId
        );
        expect(spending12p5ClothingJeansBonoboToday.date).toEqual(today);
        expect(spending12p5ClothingJeansBonoboToday.amount).toEqual(12.5);
        expect(spending12p5ClothingJeansBonoboToday.type).toEqual(TransactionType.SPENDING);
        expect(spending12p5ClothingJeansBonoboToday.category).toEqual("Clothing");
        expect(spending12p5ClothingJeansBonoboToday.subcategory).toEqual("Jeans");
        expect(spending12p5ClothingJeansBonoboToday.details).toEqual("Bonobo");
      });
      it("should get transactions in current month", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
          spending20FoodOrderDominosToday,
          spending12p5ClothingJeansBonoboToday,
        ]);
      });
      it("should get categories", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing", "Travel"]);
      });
      it("should get subcategories", async () => {
        const subcategories = await getSubcategories(
          userEmail,
          TransactionType.SPENDING,
          "Clothing"
        );
        expect(subcategories).toIncludeAllMembers(["Turtleneck", "Shirt", "Jeans"]);
      });
      it("should get details", async () => {
        const details = await getDetails(userEmail, TransactionType.SPENDING, "Clothing", "Jeans");
        expect(details).toEqual(["Bonobo"]);
      });
    });
    describe("date from today to one month ago", () => {
      it("should update date", async () => {
        spending10ClothingShirtUniqloOneMonthAgo = await updateTransaction(
          spending10ClothingShirtUniqloToday.id,
          userEmail,
          {
            date: oneMonthAgo,
            amount: 10,
            type: TransactionType.SPENDING,
            category: "Clothing",
            subcategory: "Shirt",
            details: "Uniqlo",
          }
        );
        expect(spending10ClothingShirtUniqloOneMonthAgo.id).toEqual(
          spending10ClothingShirtUniqloToday.id
        );
        expect(spending10ClothingShirtUniqloOneMonthAgo.userEmail).toEqual(userEmail);
        expect(spending10ClothingShirtUniqloOneMonthAgo.userId).toEqual(
          spending10ClothingShirtUniqloToday.userId
        );
        expect(spending10ClothingShirtUniqloOneMonthAgo.date).toEqual(oneMonthAgo);
        expect(spending10ClothingShirtUniqloOneMonthAgo.amount).toEqual(10);
        expect(spending10ClothingShirtUniqloOneMonthAgo.type).toEqual(TransactionType.SPENDING);
        expect(spending10ClothingShirtUniqloOneMonthAgo.category).toEqual("Clothing");
        expect(spending10ClothingShirtUniqloOneMonthAgo.subcategory).toEqual("Shirt");
        expect(spending10ClothingShirtUniqloOneMonthAgo.details).toEqual("Uniqlo");
      });
      it("should get transactions in current month, without this one", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending20FoodRestaurantPNYToday,
          spending24p99FoodRestaurantOliveChickenToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
          spending20FoodOrderDominosToday,
          spending12p5ClothingJeansBonoboToday,
        ]);
      });
      it("should get transactions in previous month, this one included", async () => {
        const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
        expect(transactionsOfPreviousMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisOneMonthAgo,
          spending1255p44TravelAirplaneTurkeyOneMonthAgo,
          spending10ClothingShirtUniqloOneMonthAgo,
        ]);
      });
    });
  });
  describe("deleting", () => {
    describe("spending in current month with unique category", () => {
      it("should delete spending", async () => {
        const deletedSpending = await deleteTransaction(
          spending1255p44TravelAirplaneTurkeyOneMonthAgo.id,
          userEmail
        );
        expect(deletedSpending).toEqual(spending1255p44TravelAirplaneTurkeyOneMonthAgo);
      });
      it("should get transactions in previous month, without this one", async () => {
        const transactionsOfPreviousMonth = await getTransactionsOfMonth(userEmail, -1);
        expect(transactionsOfPreviousMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisOneMonthAgo,
          spending10ClothingShirtUniqloOneMonthAgo,
        ]);
      });
      it("should get categories, without this one's", async () => {
        const categories = await getCategories(userEmail, TransactionType.SPENDING);
        expect(categories).not.toIncludeAnyMembers(["Travel"]);
        expect(categories).toIncludeAllMembers(["Food", "Housing", "Clothing"]);
      });
    });
    describe("spending in previous month with unique details", () => {
      it("should delete spending", async () => {
        const deletedSpending = await deleteTransaction(
          spending20FoodRestaurantPNYToday.id,
          userEmail
        );
        expect(deletedSpending).toEqual(spending20FoodRestaurantPNYToday);
      });
      it("should get transactions in current month, without this one", async () => {
        const transactionsOfCurrentMonth = await getTransactionsOfMonth(userEmail, 0);
        expect(transactionsOfCurrentMonth).toIncludeAllMembers([
          spending1000HousingRentLodgisToday,
          spending50ClothingTurtleneckUniqloToday,
          spending10ClothingShirtCelioToday,
          spending22p57FoodGroceriesMonoprixFirstCurrentMonth,
          spending17p03FoodGroceriesCasinoTwentiethCurrentMonth,
          spending20FoodOrderDominosToday,
          spending12p5ClothingJeansBonoboToday,
        ]);
      });
      it("should get details, without this one's", async () => {
        const details = await getDetails(userEmail, TransactionType.SPENDING, "Food", "Restaurant");
        expect(details).not.toIncludeAnyMembers(["PNY"]);
        expect(details).toEqual(["Olive Chicken"]);
      });
    });
  });
  describe("different user", () => {
    it("should have no spendings in current month", async () => {
      const transactionsOfCurrentMonth = await getTransactionsOfMonth(differentUserEmail, 0);
      expect(transactionsOfCurrentMonth).toEqual([]);
    });
    it("should have no spendings in previous month", async () => {
      const transactionsOfPreviousMonth = await getTransactionsOfMonth(differentUserEmail, 1);
      expect(transactionsOfPreviousMonth).toEqual([]);
    });
    it("should have no categories", async () => {
      const categories = await getCategories(differentUserEmail, TransactionType.SPENDING);
      expect(categories).toEqual([]);
    });
    it("should have no subcategories", async () => {
      const subcategories = await getSubcategories(
        differentUserEmail,
        TransactionType.SPENDING,
        "Food"
      );
      expect(subcategories).toEqual([]);
    });
    it("should have no details", async () => {
      const details = await getDetails(
        differentUserEmail,
        TransactionType.SPENDING,
        "Food",
        "Order"
      );
      expect(details).toEqual([]);
    });
  });
  describe("errors", () => {
    it("should throw when trying to update a spending with invalid id", async () => {
      await expect(
        updateTransaction("invalidId", userEmail, {
          date: today,
          amount: 10,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Restaurant",
          details: "PNY",
        })
      ).rejects.toThrowError("Record to update not found.");
    });
    it("should throw when trying to delete a spending with invalid id", async () => {
      await expect(deleteTransaction("invalidId", userEmail)).rejects.toThrowError(
        "Record to delete does not exist."
      );
    });
    it("should throw when trying to update a deleted spending", async () => {
      await expect(
        updateTransaction(spending1255p44TravelAirplaneTurkeyOneMonthAgo.id, userEmail, {
          date: today,
          amount: 10,
          type: TransactionType.SPENDING,
          category: "Food",
          subcategory: "Restaurant",
          details: "PNY",
        })
      ).rejects.toThrowError("Record to update not found.");
    });
    it("should throw when trying to delete a deleted spending", async () => {
      await expect(
        deleteTransaction(spending1255p44TravelAirplaneTurkeyOneMonthAgo.id, userEmail)
      ).rejects.toThrowError("Record to delete does not exist.");
    });
    it("should throw when trying to update a different user's spending", async () => {
      await expect(
        updateTransaction(spending10ClothingShirtCelioToday.id, differentUserEmail, {
          date: today,
          amount: 11,
          type: TransactionType.SPENDING,
          category: "Clothing",
          subcategory: "Shirt",
          details: "Celio",
        })
      ).rejects.toThrowError("Record to update not found.");
    });
    it("should throw when trying to delete a different user's spending", async () => {
      await expect(
        deleteTransaction(spending10ClothingShirtCelioToday.id, differentUserEmail)
      ).rejects.toThrowError("Record to delete does not exist.");
    });
  });
});
