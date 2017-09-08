class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  prepend_before_action :require_no_authentication, only: [:new, :create]
  skip_before_action :verify_authenticity_token, except: [:sign_up]
  skip_before_action :verify_signed_out_user

  def sign_up_or_in
    if @user = User.find_for_database_authentication(email: params[:email])
      log_in
    else
      sign_up
    end
  end

  def sign_up
    @user = User.new(email: params[:email], password: params[:password], name: params[:name])
    if @user.save
      sign_in(@user)
      render json: {status: {ok: true}, user: @user}
    else
      render json: {status: {ok: false, message: @user.errors.full_messages}}
    end
  end

  def log_in
    if @user.valid_password?(params[:password])
      sign_in(@user)
      return render json: {status: {ok: true}, user: @user}
    else
      return render json: {status: {ok: false, message: 'Invalid Log In Attempt'}}
    end
  end

  def destroy
    if sign_out(current_user)
      return render json: {status: {ok: true}}
    else
      return render json: {status: {ok: false, message: 'Hmm, something went wrong. Try reloading the page'}}
    end
  end

   private

    def user_params
      params.require(:user).permit(:email, :password, :encrypted_password)
    end
end
