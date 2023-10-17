import { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "İsminiz en az 2 karakter içermelidir.")
    .required("Ad gereklidir."),
  last_name: yup
    .string()
    .min(2, "Soyadınız en az 2 karakter içermelidir.")
    .required("Soyad gereklidir."),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter içermelidir.")
    .required("Şifre gereklidir."),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi girin.")
    .required("E-posta gereklidir.")
    .notOneOf(["waffle@syrup.com"], "Bu e-posta adresi daha önce eklenmiştir."),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Cinsiyetinizi seçmelisiniz.")
    .required("Cinsiyet gereklidir."),
  agreement: yup
    .boolean()
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz."),
});

export default function Form(props) {
  const { addUser } = props;
  const initialForm = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    gender: "",
    agreement: false,
  };

  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    kontrolFonksiyonuButunForm(formData);
  }, [formData]);

  const mySubmitHandler = (event) => {
    event.preventDefault();
    if (!isDisabled) {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((response) => {
          addUser(response.data);
          setFormData(initialForm);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const kontrolFonksiyonuAlanlar = (name, value) => {
    schema
      .reach(name)
      .validate(value)
      .then(() => {
        const newErrorState = {
          ...formErrors,
          [name]: "",
        };
        setFormErrors(newErrorState);
      })
      .catch((err) => {
        const newErrorState = {
          ...formErrors,
          [name]: err.errors[0],
        };
        setFormErrors(newErrorState);
      });
  };

  const kontrolFonksiyonuButunForm = (formVerileri) => {
    schema.isValid(formVerileri).then((valid) => {
      setIsDisabled(!valid);
    });
  };

  const myChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    const newState = {
      ...formData,
      [name]: newValue,
    };

    setFormData(newState);
    kontrolFonksiyonuAlanlar(name, newValue);
  };

  return (
    <form onSubmit={mySubmitHandler}>
      <div className="space-y-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Üye ol sayfasına hoş geldiniz
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Aşağıdaki bilgileri eksiksiz doldurunuz.
          </p>

          <div className="mt-10 flex flex-col">
            <div className="mb-10">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  data-cy="first_name"
                  value={formData.first_name}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {formErrors.first_name && (
                  <div data-cy="fname-error" className="text-red-600">
                    {formErrors.first_name}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-10">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  data-cy="last_name"
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formErrors.last_name && (
                <div data-cy="lname-error" className="text-red-600">
                  {formErrors.last_name}
                </div>
              )}
            </div>
            <div className="mb-10">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  data-cy="password"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={myChangeHandler}
                  placeholder="Şifrenizi giriniz!"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formErrors.password && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.password}
                </div>
              )}
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  data-cy="email"
                  value={formData.email}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {formErrors.email && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.email}
                </div>
              )}
            </div>
            <div className="sm:col-span-4 mt-10 w-1/2 mx-auto">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900 mb-2"
              >
                {" "}
                Gender
              </label>
              <div>
                <select
                  name="gender"
                  data-cy="gender"
                  value={formData.gender}
                  onChange={myChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Please select one…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              {formErrors.gender && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.gender}
                </div>
              )}
            </div>
            <div className="sm:col-span-4 mt-10 w-1/2 mx-auto">
              <label htmlFor="agreement">
                <b>I agree to terms and conditions</b>
              </label>
              <input
                data-cy="agreement"
                id="agreement"
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={myChangeHandler}
                className="ml-5"
              />
              {formErrors.agreement && (
                <div data-cy="errors" className="text-red-600">
                  {formErrors.agreement}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          disabled={isDisabled}
          data-cy="submit"
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
