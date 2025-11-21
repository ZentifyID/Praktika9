using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebApplication7.Models;

namespace WebApplication7.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Account/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(UserModel model)
        {
            if (ModelState.IsValid)
            {
                // Проверка уникальности email
                if (!IsEmailUnique(model.Email))
                {
                    ModelState.AddModelError("Email", "Этот email уже используется другим пользователем");
                    return View(model);
                }

                try
                {
                    // Имитация сохранения данных в БД через Session
                    var registeredUsers = Session["RegisteredUsers"] as List<UserModel>
                                          ?? new List<UserModel>();

                    registeredUsers.Add(model);
                    Session["RegisteredUsers"] = registeredUsers;

                    // Передаём последнего зарегистрированного
                    Session["RegisteredUser"] = model;

                    return RedirectToAction("Success");
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", "Ошибка при сохранении данных: " + ex.Message);
                }
            }

            return View(model);
        }

        // Проверка уникальности email
        private bool IsEmailUnique(string email)
        {
            var registeredUsers = Session["RegisteredUsers"] as List<UserModel>;

            if (registeredUsers != null)
            {
                return !registeredUsers.Any(u =>
                    u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
            }

            return true;
        }

        // Страница успешной регистрации
        public ActionResult Success()
        {
            var user = Session["RegisteredUser"] as UserModel;

            if (user != null)
            {
                return View(user);
            }

            return RedirectToAction("Create");
        }
    }
}
