/* eslint-disable no-undef */
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../../index");
const favoriteService = require("../../services/favoriteService");
const jwt = require("jsonwebtoken");

const { expect } = chai;
chai.use(chaiHttp);

describe("Favorite Router", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("POST /create", () => {
    it("should create favorites array", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const createFavoritesStub = sinon
        .stub(favoriteService, "createFavorites")
        .resolves("Favorito criado com sucesso");

      const response = await chai
        .request(app)
        .post("/favorites/create")
        .set("Authorization", `Bearer ${token}`);

      expect(response).to.have.status(201);
      expect(verifyStub.calledOnce).to.be.true;
      expect(createFavoritesStub.calledOnce).to.be.true;
    });
  });

  describe("GET /", () => {
    it("should list the favorites", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";
      const favorites = {
        favorite: ["Aatrox", "Ahri", "Akali"],
      };

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const listFavoritesStub = sinon
        .stub(favoriteService, "listFavorites")
        .resolves(favorites);

      const response = await chai
        .request(app)
        .get("/favorites")
        .set("Authorization", `Bearer ${token}`);

      expect(response).to.have.status(200);
      expect(response.body).to.deep.equal(favorites.favorite);
      expect(verifyStub.calledOnce).to.be.true;
      expect(listFavoritesStub.calledOnce).to.be.true;
    });
  });

  describe("POST /", () => {
    it("should add a favorite", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";
      const favoriteName = "Yasuo";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const addFavoriteStub = sinon
        .stub(favoriteService, "addFavorite")
        .resolves("Favorito adicionado com sucesso");

      const response = await chai
        .request(app)
        .post("/favorites")
        .set("Authorization", `Bearer ${token}`)
        .send({ favoriteName });

      expect(response).to.have.status(201);
      expect(response.body.message).to.deep.equal(
        "Favorito adicionado com sucesso"
      );
      expect(verifyStub.calledOnce).to.be.true;
      expect(addFavoriteStub.calledOnce).to.be.true;
    });
  });

  describe("DELETE /", () => {
    it("should remove a favorite", async () => {
      const user = { id: 1, name: "User", email: "user@example.com" };
      const token = "token";
      const favoriteName = "Yasuo";

      const verifyStub = sinon.stub(jwt, "verify").returns(user);
      const removeFavoriteStub = sinon
        .stub(favoriteService, "removeFavorite")
        .resolves("Favorito removido com sucesso");

      const response = await chai
        .request(app)
        .delete("/favorites")
        .set("Authorization", `Bearer ${token}`)
        .send({ favoriteName });

      expect(response).to.have.status(200);
      expect(response.body.message).to.deep.equal(
        "Favorito removido com sucesso"
      );
      expect(verifyStub.calledOnce).to.be.true;
      expect(removeFavoriteStub.calledOnce).to.be.true;
    });
  });
});
