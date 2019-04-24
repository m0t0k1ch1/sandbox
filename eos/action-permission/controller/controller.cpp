#include "controller.hpp"

using namespace eosio;

void controller::execute(name to, name act, std::vector<char> data, authority before, authority after) {
  require_auth(_self);

  update_active_auth(before);

  action a = action();
  a.authorization.push_back(permission_level{_self, name("active")});
  a.account = to;
  a.name    = act;
  a.data    = data;
  a.send();

  update_active_auth(after);
}

void controller::update_active_auth(authority auth)
{
  action(
    permission_level{_self, name("active")},
    name("eosio"),
    name("updateauth"),
    std::make_tuple(_self, name("active"), name("owner"), auth)
  ).send();
}
