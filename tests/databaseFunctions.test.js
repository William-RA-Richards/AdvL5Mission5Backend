const { app } = require("../server");
const request = require("supertest");

describe("/api/search endpoint normal tests", () => {
  it("should return items that match the search term given whether in title or description.", async () => {
    const response = await request(app).get(
      "/api/search?search_string=Custom%20Seiko"
    );
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      response: [
        {
          _id: "67ed112892f0b4ed1d351ad6",
          title: "Custom Seiko MOD Datejust Arabic Numbering",
          description:
            "Custom Seiko Mod Datejust - Arabic Numbering THE WATCH IS NEW, TESTED, PERFECTLY WORKING & NEVER WORN. Upgrade your style with this meticulously handcrafted, elegant dress watch. Please Note: This is a custom watch. It is not manufactured by Seiko and is not commercially available. The watch is handmade and customized, built with a 100% original Seiko NH35A automatic movement and excellent quality new aftermarket parts. Features: Material: Stainless Steel Jubilee Bracelet Condition: Brand New Specifications: Case Diameter: 39mm (excluding the crown) Case Thickness: 12.5mm Lug Size: 20mm Crystal: Sapphire Water Resistance: 5ATM Movement: Seiko NH35A Automatic Discover more here: https://oracleoftime.com/seiko-modding/",
          start_price: 285,
          reserve_price: 310,
          __v: 0,
        },
      ],
    });
  });
});
