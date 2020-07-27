#include "factory.hpp"

using namespace eosio;

void factory::create(
  const name& account,
  uint32_t    ram_bytes
) {
  require_auth(get_self());

  authority auth = {
    1,
    {},
    {permission_level_weight{{get_self(), name("eosio.code")}, 1}},
    {}
  };

  action(
    permission_level{get_self(), name("active")},
    name("eosio"),
    name("newaccount"),
    std::make_tuple(get_self(), account, auth, auth)
  ).send();

  action(
    permission_level{get_self(), name("active")},
    name("eosio"),
    name("buyrambytes"),
    std::make_tuple(get_self(), account, ram_bytes)
  ).send();
}

void factory::init(
  const name&      account,
  const name&      code_key,
  const authority& auth_owner,
  const authority& auth_active
) {
  require_auth(get_self());

  const auto& code = codes.get(code_key.value, "code is not found");

  action(
    permission_level{account, name("active")},
    name("eosio"),
    name("setcode"),
    std::make_tuple(account, 0, 0, code.value)
  ).send();

  action(
    permission_level{account, name("owner")},
    name("eosio"),
    name("updateauth"),
    std::make_tuple(account, name("owner"), name(""), auth_owner)
  ).send();

  action(
    permission_level{account, name("active")},
    name("eosio"),
    name("updateauth"),
    std::make_tuple(account, name("active"), name("owner"), auth_active)
  ).send();
}

void factory::setcode(
  const name&              key,
  const std::vector<char>& value
) {
  require_auth(get_self());

  auto code_itr = codes.find(key.value);
  if (code_itr == codes.end()) {
    codes.emplace(get_self(), [&](auto& row) {
      row.key   = key;
      row.value = value;
    });
  } else {
    codes.modify(code_itr, same_payer, [&](auto& row) {
      row.value = value;
    });
  }
}
