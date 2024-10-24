import { CommonActions } from "@react-navigation/native";

export const ENGLocalizedStrings = {
  Public: {
    All: "All",
    Confirm: "Confirm",
    Cancel: "Cancel",
    Back: "Back",
    Save: "Save",
    Close: "Close",
    Language: "Language: English",
    Post: "Post",
    Friend: "Friend",
    Username: "Username",
    About: "About",
    Today: "Today, what do you want to do?",
    Detail: "Detail",
    EditProfile: "Edit Profile",
    ChangePassword: "Change Password",
    LogOut: "Log Out",
    SetingProfile: "Setting Profile",
    Mail: "Email",
    Phone: "Phone Number",
    Birthday: "Birth Date",
    Active: "Created Date",
    FriendFind: "Friend Find",
    FriendView: "View All Friend",
    Conform: "Confirm",
    LogoutConfirm: "Are you sure you want to log out?",
    More: "More",
    AddFriend: "Add Friend",
    ReportFriend: "Report",
    Block: "Block",
    Vietnamese: "Vietnamese",
    English: "English",
    ErrorFetchingProfile: "Error fetching profile!",
    Biography: "Biography",
    UnknownUser: "YourVibes user",
    Public: "Public",
    Everyone: "Everyone",
    Private: "Only me",
    MinuteAgo: "minutes ago",
    HourAgo: "hours ago",
    DayAgo: "days ago",
    Action: "Action",
    CommonActions:"Click your comment ...",
    Comment: "Comments",
    Reply: "Reply",
    ReportComment:"Report Comment"

    
  },
  Form: {
    Label: {
      Email: "Email",
      Password: "Password",
      FamilyName: "Family Name",
      Name: "Name",
      Phone: "Phone Number",
      BirthDay: "Birth Date",
      GetOTP: "Enter OTP",
      OTP: "OTP Code",
      ConfirmPassword: "Confirm Password",
    },
    RequiredMessages: {
      FamilyNameRequiredMessage: "Please enter family name!",
      NameRequiredMessage: "Please enter name!",
      PhoneRequiredMessage: "Please enter phone number!",
      BirthDayRequiredMessage: "Please select a birth date!",
      EmailRequiredMessage: "Please enter email!",
      PasswordRequiredMessage: "Please enter password!",
      ConfirmPasswordRequiredMessage: "Please confirm your password!",
      AgreeRequiredMessage: "Please agree to the terms!",
      OTPRequiredMessage: "Please enter OTP code!",
      OTPPressRequiredMessage: "Please receive OTP code!",
    },
    TypeMessage: {
      EmailTypeMessage: "Invalid email!",
      PasswordTypeMessage: "Password must be over 8 characters!",
      ConfirmPasswordTypeMessage: "Confirm password is invalid!",
      OTPTypeMessage: "OTP code must be a 6-digit string!",
      PhoneTypeMessage: "Phone number must be a 10-digit string!",
    }
  },
  Login: {
    LoginButton: "Login",
    ForgotPasswordText: "Forgot password?",
    DontHaveAccout: "Don't have an account?",
    SignUpNow: "Sign up now!",
    Or: "Or",
    LoginFailed: "Login failed!"
  },
  SignUp: {
    SignUpButton: "Sign up",
    SignUpSuccess: "Sign up successful! Please log in again",
    SignUpFailed: "Sign up failed!",
    OTPSuccess: "OTP has been sent successfully!",
    OTPAlreadySent: "OTP has been sent and is valid for 10 minutes!",
    OTPFailed: "Sending OTP failed!",
    AlreadyHaveAccount: "Already have an account?",
    LoginNow: "Log in now!",
    AgreePolicies: "I agree to the YourVibes terms",
  },
  AddPost: {
    NewPost: "New post",
    WhatDoYouThink: "What do you think?",
    PrivacyText: "Share your post with",
    PostNow: "Post now",
    CreatePostSuccess: "Create post successful!",
    CreatePostFailed: "Create post failed!",
    EmptyContent: "Missing content or media file",
    PickImgFailed: "Pick images failed!",
  },
  ObjectPostPrivacy: {
    PublicDescription: 'Everyone on YourVibes',
    FriendDescription: 'Only friends on YourVibes',
    PrivateDescription: 'Only you can see the post',
    PostPrivacy: "Post's privacy",
    Contents: {
      WhoCanSee: "Who can see your post?",
      CanFind: "Your post may appear on your profile and in search results.",
      DefaultPrivacy1: "Although the default audience is ",
      DefaultPrivacy2: ", you can change the audience for this specific post."
    },
    ChoosePrivacy: "Choose Privacy"
  },
  Post: {
    EditPost: "Edit post",
    EditPrivacy: "Edit post's privacy",
    DeletePost: "Delete post",
    Advertisement: "Advertisement",
    ReportPost: "Report post",
  },
  Profile: {
    Posts: {
      GetPostsFailed: "Failed to get posts!",
      GetOnePostFailed: "Failed to get post!"
    }
  },
  UpdatePost: {
    UpdatePostSuccess: "Update post successful!",
    UpdatePostFailed: "Update post failed!",
  },
  DeletePost: {
    DeleteConfirm: "Are you sure you want to delete this post?",
    DeleteSuccess: "Delete post successful!",
    DeleteFailed: "Delete post failed!",
  }
}