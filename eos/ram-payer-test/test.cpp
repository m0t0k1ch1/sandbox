#include "test.hpp"

using namespace eosio;

void test::adduser(
  name        me,
  uint64_t    score,
  std::string memo,
  name        ram_payer
) {
  require_auth(ram_payer);

  auto user_itr = users.find(me.value);
  check(user_itr == users.end(), "user already exists");

  users.emplace(ram_payer, [&](auto& row) {
    row.key   = me;
    row.score = score;
    row.memo  = memo;
  });
}

void test::moduser(
  name        me,
  uint64_t    score,
  std::string memo
) {
  require_auth(me);

  const auto& user = users.get(me.value, "user is not found");

  users.modify(user, same_payer, [&](auto& row) {
    row.score = score;
    row.memo  = memo;
  });
}

void test::removeuser(
  name me
) {
  require_auth(me);

  const auto& user = users.get(me.value, "user is not found");

  users.erase(user);
}
